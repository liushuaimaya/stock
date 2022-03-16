export interface Account {
  name: string;
  tech?: boolean;
  holdings: {
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
