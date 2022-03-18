import { useEffect, useState } from "react";
import { fetchList, Stock } from "../../api/tencent";
import { Account } from "../../const";

export const useStockList = (account: Account) => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<(Stock & { share: number })[]>([]);

  useEffect(() => {
    setLoading(true);
    const codes = account.holdings.map(({ code }) => code);
    fetchList(codes)
      .then((stockList) =>
        setList(
          stockList.map((stock) => ({
            ...stock,
            share: account.holdings.find((holding) => holding.code === stock.code)?.share || 0,
          }))
        )
      )
      .finally(() => setLoading(false));
  }, [account]);

  return { list, loading };
};
