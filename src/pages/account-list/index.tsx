import React from "react";
import { Account } from "../../const";
import { accounts } from "../../data/accounts";
import { AccountTable } from "./account-table";
import styles from "./index.module.css";

const getTotalStocks = (accounts: Account[]) => {
  const res = accounts
    .map(({ stocks }) => stocks)
    .reduce(
      (res, stock) => {
        stock.forEach((item) => {
          const resItem = res.find((it) => it.code === item.code);
          if (!resItem) res.push({ ...item });
          else resItem.share += item.share;
        });
        return res;
      },
      [{ code: "399300", share: 0 }]
    );
  return res;
};

export const AccountList = () => {
  const accountInfoList = [
    { name: "Total", isSummary: true, stocks: getTotalStocks(accounts) },
    ...accounts.map((account) => ({ ...account, isSummary: false })),
  ];

  return (
    <div className={styles.accountList}>
      {accountInfoList.map((account) => (
        <AccountTable className={styles.account} key={account.name} account={account} />
      ))}
    </div>
  );
};
