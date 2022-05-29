import React from "react";
import { Table, ColumnType } from "../../../components/table";
import { NewShare } from "../../../const";
import { getTotalInterest } from "../util";
import styles from "./index.module.css";

const render = (number: number) => number.toFixed(2);

interface Props {
  year: string;
  newShares: NewShare[];
}

/** 新股收益表格 */
export const StagProfitTable = ({ year, newShares }: Props) => {
  const columns: ColumnType<NewShare>[] = [
    { title: "账户名", dataIndex: "accountName" },
    { title: "时间", dataIndex: "date" },
    { title: "新股名称", dataIndex: "stockName" },
    { title: "代码", dataIndex: "code" },
    { title: "申购价格", dataIndex: "buy", render },
    { title: "卖出价格", dataIndex: "sell", render },
    { title: "中签数量", dataIndex: "share" },
    { title: "印花税", dataIndex: "stampTax", render },
    { title: "过户费", dataIndex: "transferFee", render },
    { title: "佣金", dataIndex: "commission", render },
    {
      title: "盈利",
      dataIndex: "profit",
      render: (value, record) => {
        const { buy, sell, share, stampTax, commission, transferFee } = record;
        const interest = (sell - buy) * share - (stampTax + commission + transferFee);
        return render(interest);
      },
    },
    {
      title: "误差",
      dataIndex: "sellIncome",
      render: (sellIncome, record) => {
        const { sell, share, stampTax, commission, transferFee } = record;
        const income = sell * share - (stampTax + commission + transferFee);
        const diff = income - sellIncome;
        return render(diff);
      },
    },
  ];

  const caption = `${year}: ${getTotalInterest(newShares).toFixed(0)} 元`;

  return (
    <div className={styles.stagProfitTable}>
      <Table caption={caption} dataSource={newShares} columns={columns} />
    </div>
  );
};
