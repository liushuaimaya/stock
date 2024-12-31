import React from "react";
import cx from "classnames";
import { Stock } from "../../../api/tencent";
import { ColumnType, Table } from "../../../components/table";
import { AccountWithIsSummary, NEW_STOCK_BASE_SH, NEW_STOCK_BASE_SS } from "../../../const";
import { useStockList } from "../hook";
import { numberToPercentText, formatToW, getSymbol, isSH } from "../util";
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
  className?: string;
}

export const AccountTable = ({ account, className }: Props) => {
  const { loading, list } = useStockList(account);

  if (loading) return <div>loading...</div>;

  /** 总金额 */
  const total = list.reduce((res, item) => res + item.current * item.share, 0);

  const extendedList = list
    .filter((it) => it.code !== "399300")
    .map((stock) => {
      const value = Math.round(stock.current * stock.share);
      const percent = numberToPercentText(value / total, false);
      return { ...stock, value, percent };
    })
    .sort((a, b) => b.value - a.value);

  const columns: ColumnType<(typeof list)[number]>[] = [
    { dataIndex: "code", title: "证券代码" },
    { dataIndex: "name", title: "股票名称" },
    { dataIndex: "share", title: "持仓" },
    {
      dataIndex: "current",
      title: "现价",
      render: (value: number) => `${value.toFixed(2)}`,
    },
    {
      dataIndex: "changePercent",

      title: "涨跌幅",
      render: (value: number) => numberToPercentText(value / 100),
    },
    { dataIndex: "value", title: "市值" },
    { dataIndex: "percent", title: "仓位" },
  ];

  const renderSummaryTitle = () => {
    /** 今日盈亏 */
    const dailyChange = Math.round(list.reduce((res, item) => res + item.changeNumber * item.share, 0));
    /** 今日盈亏 */
    const dailyChangeText = `${getSymbol(dailyChange)}${dailyChange}`;
    /** 今日百分比 */
    const dailyChangePercentText = numberToPercentText(dailyChange / total);
    const hs300 = list.find(({ code }) => code === "399300");
    const hs300ChangePercentText = numberToPercentText((hs300?.changePercent || 0) / 100);

    return (
      <>
        <span className={classes.name}>{`${account.name}: ${Math.round(total)}元`}</span>
        <span>{`今日盈亏: ${dailyChangeText}(${dailyChangePercentText})`}</span>
        <span>{`沪深300: ${hs300?.current}(${hs300ChangePercentText})`}</span>
      </>
    );
  };

  const renderTitle = () => {
    /** 计算打新缺失市值 */
    const [totalSH, totalSZ] = list.reduce(
      (res, item) => {
        const value = item.current * item.share;
        return isSH(item.code) ? [res[0] + value, res[1]] : [res[0], res[1] + value];
      },
      [-NEW_STOCK_BASE_SH, -NEW_STOCK_BASE_SS]
    );
    return (
      <>
        <span className={classes.name}>{`${account.name}: ${Math.round(total)}元`}</span>
        <span className={classes.diff}>{` 沪: ${formatToW(totalSH)}   深: ${formatToW(totalSZ)}`}</span>
      </>
    );
  };

  return (
    <div className={cx(classes.stockList, className)}>
      <div className={classes.title}>{account.isSummary ? renderSummaryTitle() : renderTitle()}</div>
      <Table rowClassName={getRowClassName} dataSource={extendedList} columns={columns} />
    </div>
  );
};
