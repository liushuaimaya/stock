import { SinaStockDetail } from "./const";

const baseUrl = "https://hq.sinajs.cn/list=";

/**
 * @deprecated 新浪修改了referer策略,在浏览器环境已无法使用
 * @desc 获取股票报价信息
 *
 */
export const fetchList = async (codes: string[]) => {
  return new Promise<SinaStockDetail[]>((resolve, reject) => {
    const src = `${baseUrl}${codes.map(withPrefix).join(",")}`;
    const element = document.createElement("script");
    element.src = src;
    element.addEventListener("load", () => {
      const stockInfoList: string[][] = codes.map((code) => [
        code,
        ...eval(`hq_str_${withPrefix(code)}`)
          .split(",")
          .slice(0, 32),
      ]);
      const stockDetailList = stockInfoList.map(getStockDetail);
      element.remove();
      resolve(stockDetailList);
    });
    document.body.appendChild(element);
  });
};

const getStockDetail = (stockInfo: string[]) => {
  const emptyDetail = new SinaStockDetail() as any;
  const keys = Object.keys(emptyDetail);
  return keys.reduce((res, key, index) => {
    let value = stockInfo[index];
    const parsedValue = emptyDetail[key] === "number" ? Number(value) : value;
    return { ...res, [key]: parsedValue };
  }, {} as SinaStockDetail);
};

const withPrefix = (code: string) => {
  const isSH = (code: string) => String(code).startsWith("6");
  return `${isSH(code) ? "sh" : "sz"}${code}`;
};
