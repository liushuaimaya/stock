import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import AccountTables from "./StockComponents";
import getAccounts from "./fetchData";
import "./index.css";

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    getAccounts().then(setData);
  }, []);
  if (!data) return <div>Loading...</div>;
  else return <AccountTables accounts={data} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
