const calculator = require('./calculator.js');
const exchangeData = require("./exchange_data.js")

const DEBUG = false;

module.exports = function findOpportunities(exchanges, investment=100) {
  if (DEBUG) console.time("opportunities");
  for (const exchange of exchanges) {
    exchange.data = exchangeData[exchange.exchange];
  }

  const opportunities = [];
  const pairs = makePairs(exchanges);
  for (const pair of pairs) {
    const opportunity = calculator(pair[0], pair[1], investment);
    if (opportunity != null && opportunity.length) {
      opportunities.push(opportunity[0]);
      opportunities.push(opportunity[1]);
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