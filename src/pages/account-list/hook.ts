import { useEffect, useState } from "react";
import { debouncedFetchStockList, Stock } from "../../api/tencent";
import { Account } from "../../const";

export const useStockList = (account: Account) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<(Stock & { share: number })[]>([]);

  useEffect(() => {
    setLoading(true);
    const codes = account.stocks.map(({ code }) => code);
    debouncedFetchStockList(codes)
      .then((stockInfoList) =>
        setList(
          stockInfoList.map((item) => ({
            ...item,
            share: account.stocks.find((stock) => stock.code === item.code)?.share || 0,
          }))
        )
      )
      .finally(() => setLoading(false));
  }, [account]);

  return { list, loading };
};
