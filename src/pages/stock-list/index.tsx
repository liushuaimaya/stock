import React from "react";
import { Stock } from "../../api/tencent";
import { ColumnType, Table } from "../../components/table";
import { AccountWithIsSummary, NEW_STOCK_BASE_SH, NEW_STOCK_BASE_SS } from "../../const";
import { useStockList } from "./hook";
import { numberToPercentText, formatToW, getSymbol, isSH } from "./util";
import classes from "./index.module.css";

const getRowClassName = ({ changePercent }: Stock) => {
  if (changePercent > 0) {
    return classes.red;
  }
  if (changePercent < 0) {
    return classes.green;
  }
  return classes.normal;
};

interface Props {
  account: AccountWithIsSummary;
}

const StockList = ({ account }: Props) => {
  const { loading, list } = useStockList(account);

  if (loading) return <div>loading...</div>;

  /** 总金额 */
  const total = list.reduce((res, item) => res + item.current * item.share, 0);

  /** 今日盈亏 */
  const dailyChange = Math.round(list.reduce((res, item) => res + item.changeNumber * item.share, 0));
  /** 今日盈亏 */
  const dailyChangeText = `${getSymbol(dailyChange)}${dailyChange}`;
  /** 今日百分比 */
  const dailyChangePercentText = numberToPercentText(dailyChange / total);

  /** 计算打新缺失市值 */
  const [totalSH, totalSZ] = list.reduce(
    (res, item) => {
      const value = item.current * item.share;
      return isSH(item.code) ? [res[0] + value, res[1]] : [res[0], res[1] + value];
    },
    [-NEW_STOCK_BASE_SH, -NEW_STOCK_BASE_SS]
  );

  const extendedList = list
    .map((stock) => {
      const value = Math.round(stock.current * stock.share);
      const percent = numberToPercentText(value / total, false);
      return { ...stock, value, percent };
    })
    .sort((a, b) => b.value - a.value);

  const columns: ColumnType<typeof list[number]>[] = [
    { dataIndex: "code", title: "证券代码" },
    { dataIndex: "name", title: "股票名称" },
    { dataIndex: "share", className: classes.right, title: "持仓" },
    {
      dataIndex: "current",
      className: classes.right,
      title: "现价",
      render: (value: number) => `${value.toFixed(2)}`,
    },
    {
      dataIndex: "changePercent",
      className: classes.right,
      title: "涨跌幅",
      render: (value: number) => numberToPercentText(value / 100),
    },
    { dataIndex: "value", className: classes.right, title: "市值" },
    { dataIndex: "percent", className: classes.right, title: "仓位" },
  ];

  return (
    <div className={classes.stockList}>
      <div className={classes.title}>
        {account.isSummary ? (
          <>
            <span className={classes.name}>{`${account.name}: ${Math.round(total)}元`}</span>
            <span>{`今日盈亏:${dailyChangeText}(${dailyChangePercentText})`}</span>
          </>
        ) : (
          <>
            <span className={classes.name}>{`${account.name}: ${Math.round(total)}元`}</span>
            <span className={classes.tech}>{`科创: ${account.tech ? "✅" : "❌"}`}</span>
            <span className={classes.diff}>{` 沪: ${formatToW(totalSH)}   深: ${formatToW(totalSZ)}`}</span>
          </>
        )}
      </div>
      <Table rowKey="code" rowClassName={getRowClassName} dataSource={extendedList} columns={columns} />
    </div>
  );
};

export default StockList;
