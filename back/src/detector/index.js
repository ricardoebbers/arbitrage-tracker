const calculator = require('./calculator.js');
const exchangeData = require("./exchange_data.js")

const DEBUG = false;

module.exports = function findOpportunities(exchanges, minProfitability=0.0025, investment=100) {
  if (DEBUG) console.time("opportunities");
  for (const exchange of exchanges) {
    exchange.data = exchangeData[exchange.exchange];
  }

  const opportunities = [];
  const pairs = makePairs(exchanges);
  for (const pair of pairs) {
    const opportunity = calculator(pair[0], pair[1], minProfitability, investment);
    if (opportunity != null) {
      opportunities.push(opportunity);
    }
  }
  if (DEBUG) console.timeEnd("opportunities");
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