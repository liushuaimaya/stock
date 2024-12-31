import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AccountList } from "./pages/account-list";
import { StagProfit } from "./pages/stag-profit";
import { ACCOUNT_DETAILS } from "./data/accounts";
// import User from "./components/user";
import "./api/tencent";
import "./styles/init.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

root.render(
  // <User />
  <BrowserRouter>
    <Routes>
      {Object.entries(ACCOUNT_DETAILS).map(([name, { path, accounts }]) => (
        <Route
          key={name}
          path={path}
          element={<AccountList accounts={accounts} />}
        />
      ))}
      <Route path="new" element={<StagProfit />} />
    </Routes>
  </BrowserRouter>
);
