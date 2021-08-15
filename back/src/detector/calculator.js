const DEBUG = false;

module.exports = function calculateExpectedProfit(exchangeA, exchangeB, minProfitability, investment) {
  const profitA = profitOnBuyFromX(exchangeA, exchangeB, investment);
  const profitB = profitOnBuyFromX(exchangeB, exchangeA, investment);
  if (DEBUG) console.table({ [exchangeA.exchange]: profitA, [exchangeB.exchange]: profitB });
  return profitA > profitB 
  ? makeResultObject(profitA, exchangeA.exchange, exchangeB.exchange, minProfitability, investment) 
  : makeResultObject(profitB, exchangeB.exchange, exchangeA.exchange, minProfitability, investment)
}
  
function profitOnBuyFromX(exchangeX, exchangeY, investment) {
  if (exchangeX.price > exchangeY.price) return -1;
  const { buyTax, buyCost } = exchangeX.data;
  const { sellTax, sellCost } = exchangeY.data;

  const coinsBought = ((investment * (1-buyTax)) - buyCost) / exchangeX.price;
  const sale = coinsBought * exchangeY.price;
  const taxedSale = (sale * (1-sellTax)) - sellCost;
  return taxedSale - investment;
}

function makeResultObject(profit, buyAt, sellAt, minProfitability, investment) {
  if (profit < 0) return null;
  if (profit > (investment * minProfitability)) {
    return {
      buyAt,
      sellAt,
      profit,
      profitability: (profit / investment) * 100,
      investment,
    };
  }
}
