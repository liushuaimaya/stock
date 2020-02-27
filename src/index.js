import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import AccountTables from "./StockComponents";
import getAccounts from "./fetchData";
import "./index.css";
// import useNoTouchMove from "./useNoTouchMove";

const App = () => {
  const [data, setData] = useState(null);
  // useNoTouchMove();
  useEffect(() => {
    getAccounts().then(setData);
  }, []);
  let content;
  if (!data) content = <div>Loading...</div>;
  else content = <AccountTables accounts={data} />;
  return content;
};

ReactDOM.render(<App />, document.getElementById("root"));
