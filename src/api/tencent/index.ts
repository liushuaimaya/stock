import { isSH } from "../../util";

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
