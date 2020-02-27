import React, { useState, useEffect } from "react";
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
    <td>{(props.change >= 0 ? "+" : "") + props.change.toFixed(2)}%</td>
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
    <div className="box">
      <table>
        <StockCaption name={name} total={total} />
        <StockHeader />
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

// accounts-[holdings]-{}
const SelfRemove = ({ el }) => {
  const [element, setElement] = useState(el);
  useEffect(() => {
    setTimeout(() => setElement(null), 4000);
  });
  return element;
};

const AccountTables = ({ accounts }) => {
  const accountsTables = accounts.map(account => (
    <StockTable {...account} key={account.name}></StockTable>
  ));
  const totalAll = accounts[0].total;
  const totalChange = accounts[0].totalChange;
  const percent = ((totalChange / totalAll) * 100).toFixed(2) + "%";

  return (
    <>
      <header id="top">
        <div id="top-center">
          <h2>Total Holding: {Math.round(totalAll)}元</h2>
          <div>
            今日盈亏: {totalChange > 0 && "+"}
            {totalChange}({totalChange > 0 && "+"}
            {percent})
          </div>
        </div>
      </header>
      <main>
        <SelfRemove
          el={
            <p id="daichi" className="box">
              (含王丽君代管账户资产约17万)
            </p>
          }
        />
        {accountsTables}
      </main>
    </>
  );
};

export default AccountTables;
