import React from "react";
import { NewShare } from "../../../const";
import { StagProfitTable } from "../stag-profit-table";
import { getTotalInterest, splitNewSharesByYear } from "../util";
import styles from "./index.module.css";

interface Props {
  newShares: NewShare[];
}

/** 新股收益总览 */
export const StagProfitOverview = ({ newShares }: Props) => {
  const totalAll = getTotalInterest(newShares).toFixed(0);

  const map = splitNewSharesByYear(newShares);
  return (
    <div className={styles.stagProfitOverview}>
      <div className={styles.totalAll}>{`totalAll: ${totalAll} 元`}</div>
      {[...map]
        .sort(([year1], [year2]) => Number(year1) - Number(year2))
        .map(([year, items], index) => (
          <StagProfitTable key={index} year={year} newShares={items} />
        ))}
    </div>
  );
};
