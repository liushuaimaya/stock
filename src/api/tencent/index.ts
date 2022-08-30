const PREFIX = "https://qt.gtimg.cn/q=";

export interface Stock {
  /** 股票名称 */
  name: string;
  /** 股票代码 */
  code: string;
  /** 当前价格 */
  current: number;
  /** 涨跌额 */
  changeNumber: number;
  /** 涨跌幅百分比 */
  changePercent: number;
  /** 成交量(手) */
  volume: number;
  /** 成交额(万) */
  businessVolume: number;
  /** 总市值(亿) */
  totalMarketValue: number;
}

/** 获取股票信息 */
export const fetchList = async (codeList: string[]) => {
  const url = `${PREFIX}${codeList.map(withPrefix).join(",")}`;
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const decoder = new TextDecoder("GBK");
  const text = decoder.decode(buffer);
  return parseResponseText(text);
};

const isSH = (code: string) => String(code).startsWith("6");

/** 增加前缀 */
const withPrefix = (code: string) => {
  return `s_${isSH(code) ? "sh" : "sz"}${code}`;
};

/** parse: 响应text -> 股票信息列表 */
const parseResponseText = (responseText: string) => {
  const stockStrings = responseText.split(";").slice(0, -1);
  return stockStrings.map(parseStock);
};

/** parse: 单个股票信息 */
const parseStock = (stockString: string): Stock => {
  const infoList = stockString.split("~");
  return {
    name: infoList[1],
    code: infoList[2],
    current: Number(infoList[3]),
    changeNumber: Number(infoList[4]),
    changePercent: Number(infoList[5]),
    volume: Number(infoList[6]),
    businessVolume: Number(infoList[7]),
    totalMarketValue: Number(infoList[9]),
  };
};

export const debouncedFetchList = (() => {
  /** 存已经请求到的stock */
  const cache = new Map<string, Stock>();
  /** 待请求的code */
  const pendingCodeSet = new Set<string>();
  let timerID: number | undefined = undefined;
  // 上次请求时间
  let lastFetchTime = 0;
  let pendingResolveMap = new Map<Function, string[]>();

  return async (codeList: string[]): Promise<Stock[]> => {
    return new Promise((resolve, reject) => {
      pendingResolveMap.set(resolve, codeList);
      codeList.forEach((code) => {
        if (!cache.has(code) && !pendingCodeSet.has(code)) {
          pendingCodeSet.add(code);
        }
      });
      if (timerID) {
        window.clearTimeout(timerID);
      }
      const delay = Math.min(Date.now() - lastFetchTime, 200);
      timerID = window.setTimeout(async () => {
        lastFetchTime = Date.now();
        const pendingCodeList = [...pendingCodeSet];
        const result = await fetchList(pendingCodeList);
        pendingCodeList.forEach((code, index) => {
          cache.set(code, result[index]);
        });
        pendingCodeSet.clear();
        pendingResolveMap.forEach((list, resolveFn) => {
          const stockList = list.map((it) => cache.get(it) as Stock);
          resolveFn(stockList);
        });
        pendingResolveMap.clear();
      }, delay);
    });
  };
})();
