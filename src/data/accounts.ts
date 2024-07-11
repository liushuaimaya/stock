import { Account, AccountName } from "../const";

interface AccountDetail {
  path: string;
  accounts: Account[];
}

const ACCOUNTS_MAP = {
  [AccountName.LIUSHUAI]: [
    {
      name: "刘帅",
      tech: true,
      stocks: [
        {
          code: "600028",
          share: 6200,
        },
        {
          code: "600519",
          share: 100,
        },
        {
          code: "000002",
          share: 10900,
        },
        {
          code: "002039",
          share: 980,
        },
      ],
    },
    {
      name: "张培",
      tech: true,
      stocks: [
        {
          code: "000002",
          share: 4000,
        },
        {
          code: "600507",
          share: 5100,
        },
        {
          code: "600519",
          share: 100,
        },
        {
          code: "601919",
          share: 3500,
        },
      ],
    },
    {
      name: "刘媛",
      tech: true,
      stocks: [
        {
          code: "000002",
          share: 5100,
        },
        {
          code: "600036",
          share: 2200,
        },
        {
          code: "601318",
          share: 700,
        },
        {
          code: "601919",
          share: 1500,
        },
        {
          code: "600519",
          share: 100,
        },
      ],
    },
    {
      name: "刘丰华",
      tech: true,
      stocks: [
        {
          code: "000002",
          share: 900,
        },
        {
          code: "002039",
          share: 5600,
        },
        {
          code: "600036",
          share: 2700,
        },
      ],
    },
    {
      name: "刘文雷",
      tech: true,
      stocks: [
        {
          code: "600036",
          share: 8300,
        },
        {
          code: "002039",
          share: 5600,
        },
        {
          code: "000002",
          share: 900,
        },
      ],
    },
    {
      name: "刘光兴",
      tech: true,
      stocks: [
        {
          code: "000002",
          share: 4200,
        },
        {
          code: "600036",
          share: 1100,
        },
        {
          code: "601318",
          share: 1400,
        },
        {
          code: "002304",
          share: 700,
        },
        {
          code: "601919",
          share: 4400,
        },
      ],
    },
    {
      name: "刘杰",
      tech: true,
      stocks: [
        {
          code: "600519",
          share: 100,
        },
        {
          code: "601318",
          share: 1500,
        },
        {
          code: "000002",
          share: 800,
        },
        {
          code: "002304",
          share: 600,
        },
      ],
    },
    {
      name: "张欣",
      tech: true,
      stocks: [
        {
          code: "601318",
          share: 1500,
        },
        {
          code: "000002",
          share: 3500,
        },
        {
          code: "601919",
          share: 15000,
        },
      ],
    },
    {
      name: "FZQ",
      tech: true,
      stocks: [
        {
          code: "600519",
          share: 100,
        },
      ],
    },
    {
      name: "FRZ",
      tech: true,
      stocks: [
        {
          code: "600519",
          share: 100,
        },
      ],
    },
    {
      name: "FYL",
      tech: true,
      stocks: [
        {
          code: "600519",
          share: 100,
        },
      ],
    },
    {
      name: "HSM",
      tech: true,
      stocks: [
        {
          code: "600519",
          share: 100,
        },
      ],
    },
  ],
  [AccountName.WANGXIAOJUN]: [
    {
      name: "王晓君",
      tech: true,
      stocks: [
        {
          code: "600036",
          share: 1700,
        },
        {
          code: "000002",
          share: 14300,
        },
        {
          code: "000651",
          share: 400,
        },
        {
          code: "600519",
          share: 100,
        },
      ],
    },
    {
      name: "王振威",
      tech: true,
      stocks: [
        {
          code: "600036",
          share: 2600,
        },
        {
          code: "000002",
          share: 11100,
        },
        {
          code: "600519",
          share: 100,
        },
      ],
    },
    {
      name: "王丽军",
      tech: true,
      stocks: [
        {
          code: "002039",
          share: 5980,
        },
        {
          code: "000002",
          share: 1700,
        },
        {
          code: "600036",
          share: 1700,
        },
        {
          code: "600519",
          share: 100,
        },
      ],
    },
    {
      name: "王世艳",
      tech: true,
      stocks: [
        {
          code: "002039",
          share: 4620,
        },
        {
          code: "601318",
          share: 1400,
        },
        {
          code: "600236",
          share: 5100,
        },
        {
          code: "000002",
          share: 1700,
        },
        {
          code: "600507",
          share: 2300,
        },
      ],
    },
    {
      name: "王中瑞",
      tech: true,
      stocks: [
        {
          code: "600036",
          share: 4000,
        },
        {
          code: "002304",
          share: 400,
        },
        {
          code: "000002",
          share: 3000,
        },
      ],
    },
    {
      name: "崔巧琳",
      tech: true,
      stocks: [
        {
          code: "600519",
          share: 100,
        },
        {
          code: "600036",
          share: 2100,
        },
        {
          code: "601318",
          share: 1500,
        },
        {
          code: "002304",
          share: 600,
        },
        {
          code: "000002",
          share: 900,
        },
      ],
    },
    {
      name: "闫永照",
      tech: true,
      stocks: [
        {
          code: "600519",
          share: 100,
        },
        {
          code: "601318",
          share: 1400,
        },
        {
          code: "000002",
          share: 3500,
        },
      ],
    },
  ],
};

export const ACCOUNT_DETAILS: Record<AccountName, AccountDetail> = {
  [AccountName.ALL]: {
    path: "/allmaya",
    accounts: [...ACCOUNTS_MAP[AccountName.LIUSHUAI], ...ACCOUNTS_MAP[AccountName.WANGXIAOJUN]],
  },
  [AccountName.LIUSHUAI]: {
    path: "liushuaimaya",
    accounts: ACCOUNTS_MAP[AccountName.LIUSHUAI],
  },
  [AccountName.WANGXIAOJUN]: {
    path: "/",
    accounts: ACCOUNTS_MAP[AccountName.WANGXIAOJUN],
  },
};
