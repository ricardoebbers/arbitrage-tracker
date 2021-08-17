const DEBUG = false;

module.exports = function calculateExpectedProfit(exchangeA, exchangeB, investment=1000) {
  const profitA = profitOnBuyFromX(exchangeA, exchangeB, investment);
  const profitB = profitOnBuyFromX(exchangeB, exchangeA, investment);
  if (DEBUG) console.table({ [exchangeA.exchange]: profitA, [exchangeB.exchange]: profitB });
  return makeResult(profitA, profitB, exchangeA.exchange, exchangeB.exchange, investment);

}
  
function profitOnBuyFromX(exchangeX, exchangeY, investment) {
  const { buyTax, buyCost } = exchangeX.data;
  const { sellTax, sellCost } = exchangeY.data;

  const coinsBought = ((investment * (1-buyTax)) - buyCost) / exchangeX.price;
  const sale = coinsBought * exchangeY.price;
  const taxedSale = (sale * (1-sellTax)) - sellCost;
  return taxedSale - investment;
}

function makeResult(profitA, profitB, exchangeA, exchangeB, investment) {
  const resultA = makeResultObject(profitA, exchangeA, exchangeB, investment);
  const resultB = makeResultObject(profitB, exchangeB, exchangeA, investment);
  return [ resultA, resultB ]
}

function makeResultObject(profit, buyAt, sellAt, investment) {  
    return {
      buyAt,
      sellAt,
      profit,
      investment,
    };
}
