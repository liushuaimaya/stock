import React from "react";
import { Account } from "./const";
import { holdings } from "./holdings";
import StockList from "./stock-list";

const getTotalHoldings = (holdings: Account[]) => {
  return holdings
    .map((it) => it.holdings)
    .reduce((res, holding) => {
      holding.forEach((item) => {
        const resItem = res.find((it) => it.code === item.code);
        if (!resItem) res.push({ ...item });
        else resItem.share += item.share;
      });
      return res;
    }, [] as Account["holdings"]);
};

function App() {
  return (
    <div>
      <StockList account={{ name: "Total", isSummary: true, holdings: getTotalHoldings(holdings) }} />
      {holdings.map((holding) => (
        <StockList key={holding.name} account={{ ...holding, isSummary: false }} />
      ))}
    </div>
  );
}

export default App;
