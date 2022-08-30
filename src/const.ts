export interface Account {
  name: string;
  tech?: boolean;
  stocks: {
    code: string;
    share: number;
  }[];
}

export interface AccountWithIsSummary extends Account {
  isSummary: boolean;
}

// https://www.jisilu.cn/data/new_stock/winning/?total_assets=30&account_count=1
export const NEW_STOCK_BASE_SH = 170000;
export const NEW_STOCK_BASE_SS = 130000;

export interface NewShare {
  /** 账户名 */
  accountName: string;
  /** 时间 */
  date: string;
  /** 新股名称 */
  stockName: string;
  /** 代码 */
  code: string;
  /** 申购价格 */
  buy: number;
  /** 卖出价格 */
  sell: number;
  /** 中签数量 */
  share: number;
  /** 印花税 */
  stampTax: number;
  /** 过户费 */
  transferFee: number;
  /** 佣金 */
  commission: number;
  /** 卖出金额 */
  sellIncome: number;
}
