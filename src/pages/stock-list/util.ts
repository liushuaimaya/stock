export const getSymbol = (value: number) => (value > 0 ? "+" : "");

export const numberToPercentText = (value: number, withSymbol = true) =>
  `${withSymbol ? getSymbol(value) : ""}${(100 * value).toFixed(2)}%`;

export const isSH = (code: string) => String(code).startsWith("6");

export const formatToW = (value: number) => (value / 10000).toFixed(1);
