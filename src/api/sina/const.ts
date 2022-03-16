// 买1手、买1报价、买2手、买2报价、…、买5报价、…、卖5报价、日期、时间”。
export class SinaStockDetail {
  /** 股票代码 */
  code: string = "";

  /** 股票名称 */
  name: string = "";
  /** 今日开盘价 */
  open: number = 0;
  /** 昨日收盘价 */
  previous: number = 0;
  /** 当前价格 */
  current: number = 0;
  /** 今日最高价 */
  high: number = 0;
  /** 今日最低价 */
  low: number = 0;
  /** 竞买价 */
  bid: number = 0;
  /** 竞卖价 */
  ask: number = 0;
  /** 成交股数 */
  volume: number = 0;
  /** 成交金额 */
  businessVolume: number = 0;

  /** 买1量 */
  bid1Volume: number = 0;
  /** 买1价 */
  bid1Price: number = 0;
  /** 买2量 */
  bid2Volume: number = 0;
  /** 买2价 */
  bid2Price: number = 0;
  /** 买3量 */
  bid3Volume: number = 0;
  /** 买3价 */
  bid3Price: number = 0;
  /** 买4量 */
  bid4Volume: number = 0;
  /** 买4价 */
  bid4Price: number = 0;
  /** 买5量 */
  bid5Volume: number = 0;
  /** 买5价 */
  bid5Price: number = 0;

  /** 卖1量 */
  ask1Volume: number = 0;
  /** 卖1价 */
  ask1Price: number = 0;
  /** 卖2量 */
  ask2Volume: number = 0;
  /** 卖2价 */
  ask2Price: number = 0;
  /** 卖3量 */
  ask3Volume: number = 0;
  /** 卖3价 */
  ask3Price: number = 0;
  /** 卖4量 */
  ask4Volume: number = 0;
  /** 卖4价 */
  ask4Price: number = 0;
  /** 卖5量 */
  ask5Volume: number = 0;
  /** 卖5价 */
  ask5Price: number = 0;

  /** 日期 */
  date: string = "";
  /** 时间 */
  time: string = "";
}
