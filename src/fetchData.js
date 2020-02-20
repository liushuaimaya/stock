import getStockPricePromise from "./sinaFinanceApi";

export default async function getAccounts() {
  // 获取json文件内accounts对象
  const accounts = await fetch("./holdings.json").then(it => it.json());

  // 提取accounts内所有股票代码
  const codes = getCodes(accounts);

  // 获取各股票代码对应股价和股票名称对象
  const codesInfo = await getStockPricePromise(codes);

  // 增加codeInfo股票总数量
  addQuantityToCodesInfo(accounts, codesInfo);

  addTotalAccount(accounts, codesInfo);

  // 增加股票价格信息，计算各行、各账户、所有账户总市值
  addInfoToAccounts(accounts, codesInfo);
  return accounts;
}

// 提取accounts所有股票代码
function getCodes(accounts) {
  let codes = new Set();
  accounts.forEach(({ holdings }) => {
    holdings.forEach(({ code }) => {
      codes.add(code);
    });
  });
  return Array.from(codes);
}

// 为codesInfo增加总数量
function addQuantityToCodesInfo(accounts, codesInfo) {
  Object.keys(codesInfo).forEach(key => (codesInfo[key].quantity = 0));
  for (let { holdings } of accounts) {
    for (let { code, quantity } of holdings) {
      codesInfo[code].quantity += quantity;
    }
  }
}

function addTotalAccount(accounts, codesInfo) {
  const totalHoldings = [];
  for (const code in codesInfo) {
    totalHoldings.push({
      code,
      stockName: codesInfo[code].name,
      quantity: codesInfo[code].quantity
    });
  }
  accounts.unshift({ name: "总计", holdings: totalHoldings });
}

// 为accounts添加totalAll字段(所有账户宗资产)
// 为各个account添加 total字段(单个账户总资产)
// 为每个account.holdings添加price(单只股票价格)和value字段(单只股票市值)
function addInfoToAccounts(accounts, codesInfo) {
  for (let i = 0; i < accounts.length; i++) {
    let total = 0;
    accounts[i].holdings.forEach(holding => {
      const price = codesInfo[holding.code].price;
      const value = price * holding.quantity;
      total += value;
      holding.stockName = codesInfo[holding.code].name;
      holding.price = Math.round(price * 100) / 100;
      holding.value = Math.round(value);
    });
    accounts[i].total = Math.round(total);
    accounts[i].holdings.forEach(holding => {
      holding.percent =
        ((holding.value / accounts[i].total) * 100).toFixed(2) + "%";
    });
    accounts[i].holdings.sort((a, b) => b.value - a.value);
  }
}
