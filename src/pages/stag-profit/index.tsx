import React from "react";
import { StagProfitOverview } from "./stag-profit-overview";
import { newSharesData } from "../../data/new-share";

export const StagProfit = () => {
  return <StagProfitOverview newShares={newSharesData} />;
};
