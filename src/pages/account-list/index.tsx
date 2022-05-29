import React from "react";
import { Account } from "../../const";
import { holdings } from "../../data/holdings";
import { AccountTable } from "./account-table";
import styles from "./index.module.css";

const getTotalHoldings = (holdings: Account[]) => {
  const res = holdings
    .map((it) => it.holdings)
    .reduce(
      (res, holding) => {
        holding.forEach((item) => {
          const resItem = res.find((it) => it.code === item.code);
          if (!resItem) res.push({ ...item });
          else resItem.share += item.share;
        });
        return res;
      },
      [{ code: "399300", share: 0 }]
    );
  console.log("res", res);
  return res;
};

export const AccountList = () => {
  const accountInfoList = [
    { name: "Total", isSummary: true, holdings: getTotalHoldings(holdings) },
    ...holdings.map(({ name, holdings }) => ({ name, isSummary: false, holdings })),
  ];
  return (
    <div className={styles.accountList}>
      {accountInfoList.map((account) => (
        <AccountTable className={styles.account} key={account.name} account={account} />
      ))}
    </div>
  );
};
