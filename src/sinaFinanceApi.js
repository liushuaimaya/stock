export default function getStockPricePromise(codes) {
  return new Promise((resolve, _) => {
    const script = document.createElement("script");

    script.addEventListener("load", () => {
      let codesInfo = {};
      codes.forEach(code => {
        const stockInfo = getStockInfo(code);
        const [price, priceY] = getPrice(stockInfo);
        codesInfo[code] = {
          name: getStockName(stockInfo),
          price,
          priceY
        };
      });
      resolve(codesInfo);

      function getStockInfo(code) {
        const codeVar =
          code[0] === "6" ? "hq_str_sh" + code : "hq_str_sz" + code;
        // eslint-disable-next-line
        return eval(codeVar);
      }

      function getPrice(stockInfo) {
        const info = stockInfo.split(",");
        return [parseFloat(info[3]), parseFloat(info[2])];
      }

      function getStockName(stockInfo) {
        return stockInfo.split(",")[0];
      }
    });

    script.src = "https://hq.sinajs.cn/list=" + codeParas(codes);
    document.head.appendChild(script);
  });

  function codeParas(codes) {
    return codes
      .map(code => (code[0] === "6" ? "sh" + code : "sz" + code))
      .join(",");
  }
}
