import React from "react";
// props: hasPercent 是否有百分比仓位
const StockHeader = () => (
  <thead>
    <tr>
      <th>证券代码</th>
      <th>股票名称</th>
      <th>持仓</th>
      <th>现价</th>
      <th>涨跌幅</th>
      <th>市值</th>
      <th>仓位</th>
    </tr>
  </thead>
);

// props: code stockName quantity price value percent
const StockRow = props => (
  <tr className={props.change >= 0 ? "red" : "green"}>
    <td>{props.code}</td>
    <td>{props.stockName}</td>
    <td>{props.quantity}</td>
    <td>{props.price.toFixed(2)}</td>
    <td>{props.change >= 0 ? "+" + props.change : props.change}%</td>
    <td>{props.value}</td>
    {props.percent && <td>{props.percent}</td>}
  </tr>
);

const StockCaption = ({ name, total }) => (
  <caption>{name + ": " + total + "元"}</caption>
);

// props: holdings[holding], name, total
const StockTable = ({ holdings, name, total }) => {
  const rows = holdings.map(holding => (
    <StockRow {...holding} key={holding.code}></StockRow>
  ));
  return (
    <table>
      <StockCaption name={name} total={total} />
      <StockHeader />
      <tbody>{rows}</tbody>
    </table>
  );
};

// accounts-[holdings]-{}
const AccountTables = ({ accounts }) => {
  const accountsTables = accounts.map(account => (
    <StockTable {...account} key={account.name}></StockTable>
  ));
  const totalAll = accounts[0].total;
  const totalChange = accounts[0].totalChange;
  const percent = ((totalChange / totalAll) * 100).toFixed(2) + "%";
  return (
    <div>
      <h3>Total Holding: {Math.round(totalAll)}元</h3>
      <div>(含王丽君代管账户资产约17万)</div>
      <div>
        今日盈亏:{totalChange}({percent})
      </div>
      {accountsTables}
    </div>
  );
};

export default AccountTables;
