import { NewShare } from "../../const";

export const splitNewSharesByYear = (newShares: NewShare[]) => {
  const map = new Map<string, NewShare[]>();
  newShares.forEach((item) => {
    const year = item.date.slice(0, 4);
    const currentList = map.get(year);
    map.set(year, [...(currentList || []), item]);
  });
  return map;
};

export const getTotalInterest = (newShares: NewShare[]) =>
  newShares.reduce((res, item) => {
    const { buy, sell, share, stampTax, commission, transferFee } = item;
    const interest = (sell - buy) * share - (stampTax + commission + transferFee);
    return res + interest;
  }, 0);
