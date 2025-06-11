const API_PREFIX = "https://qt.gtimg.cn/q=";

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
export const fetchStockList = async (codes: string[]): Promise<Stock[]> => {
  const url = `${API_PREFIX}${codes.map(addPrefix).join(",")}`;
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const text = new TextDecoder("GBK").decode(buffer);
  return parseStockData(text);
};

const isShanghaiStock = (code: string): boolean => code.startsWith("6");

/** 增加前缀 */
const addPrefix = (code: string): string => {
  return `s_${isShanghaiStock(code) ? "sh" : "sz"}${code}`;
};

/** 解析响应文本为股票信息列表 */
const parseStockData = (data: string): Stock[] => {
  return data.split(";").slice(0, -1).map(parseSingleStock);
};

/** 解析单个股票信息 */
const parseSingleStock = (data: string): Stock => {
  const fields = data.split("~");
  return {
    name: fields[1],
    code: fields[2],
    current: parseFloat(fields[3]),
    changeNumber: parseFloat(fields[4]),
    changePercent: parseFloat(fields[5]),
    volume: parseInt(fields[6], 10),
    businessVolume: parseFloat(fields[7]),
    totalMarketValue: parseFloat(fields[9]),
  };
};

/**
 * 防抖获取股票信息列表
 * @returns {Function} - 返回一个函数，该函数接受股票代码数组并返回股票信息列表的Promise
 */
export const debouncedFetchStockList = (() => {
  const stockCache = new Map<string, Stock>();
  const pendingCodes = new Set<string>();
  let timerId: number | undefined;
  let lastFetchTimestamp = 0;
  const resolveMap = new Map<Function, string[]>();

  return async (codes: string[]): Promise<Stock[]> => {
    return new Promise((resolve) => {
      resolveMap.set(resolve, codes);
      codes.forEach((code) => {
        if (!stockCache.has(code) && !pendingCodes.has(code)) {
          pendingCodes.add(code);
        }
      });
      if (timerId) {
        window.clearTimeout(timerId);
      }
      const delay = Math.min(Date.now() - lastFetchTimestamp, 200);
      timerId = window.setTimeout(async () => {
        lastFetchTimestamp = Date.now();
        const codesToFetch = Array.from(pendingCodes);
        const stocks = await fetchStockList(codesToFetch);
        codesToFetch.forEach((code, index) => {
          stockCache.set(code, stocks[index]);
        });
        pendingCodes.clear();
        resolveMap.forEach((codeList, resolveFn) => {
          const stockList = codeList.map((code) => stockCache.get(code));
          resolveFn(stockList);
        });
        resolveMap.clear();
      }, delay);
    });
  };
})();
