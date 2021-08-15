const DEBUG = false;

module.exports = function calculateExpectedProfit(exchangeA, exchangeB, minProfit=0.05, investment=100) {
  const profitA = profitOnBuyFromX(exchangeA, exchangeB, investment) * (exchangeA.priceUsd || exchangeA.price);
  const profitB = profitOnBuyFromX(exchangeB, exchangeA, investment) * (exchangeB.priceUsd || exchangeB.price);
  if (DEBUG) console.table({ [exchangeA.exchange]: profitA, [exchangeB.exchange]: profitB });
  return profitA > profitB 
  ? makeResultObject(profitA, exchangeA.exchange, exchangeB.exchange, minProfit, investment) 
  : makeResultObject(profitB, exchangeB.exchange, exchangeA.exchange, minProfit, investment)
}
  
function profitOnBuyFromX(exchangeX, exchangeY, investment) {
  const priceX = investment / (exchangeX.priceUsd || exchangeX.price);
  const priceY = investment / (exchangeY.priceUsd || exchangeY.price);
  const { buyTax, buyCost } = exchangeX.data;
  const { sellTax, sellCost } = exchangeY.data;

  const profit = ((priceX - buyCost) * (1 - buyTax)) - ((priceY - sellCost) * (1 - sellTax));
  return profit;
}

function makeResultObject(profit, buyAt, sellAt, minProfit, investment) {
  if (profit > (investment * minProfit)) {
    return {
      buyAt,
      sellAt,
      profit,
      profitability: (profit / investment) * 100,
      investment,
    };
  }
}
