const calculator = require('./calculator.js');
const exchangeData = require("./exchange_data.js")

module.exports = function findOpportunities(exchanges, minProfit, investment) {
  for (const exchange of exchanges) {
    exchange.data = exchangeData[exchange.exchange];
  }

  const opportunities = [];
  for (const pair of makePairs(exchanges)) {
    const opportunity = calculator(pair[0], pair[1], minProfit, investment);
    if (opportunity != null) {
      opportunities.push(opportunity);
    }
  }

  return opportunities;
}

function makePairs(exchanges) {
  const pairs = [];
  for (let i = 0; i < exchanges.length; i++) {
    if (exchanges[i].data == null) continue;
    for (let j = i + 1; j < exchanges.length; j++) {
      if (exchanges[j].data == null) continue;
      pairs.push([exchanges[i], exchanges[j]]);
    }
  }
  return pairs;
}