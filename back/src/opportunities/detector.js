const calculator = require('./calculator.js');
const exchangeData = require("./exchange_data.js")

const DEBUG = false;

module.exports = function findOpportunities(message) {
  if (DEBUG) console.time("opportunities");
  for (const exchange of message.events) {
    exchange.data = exchangeData[exchange.exchange];
  }

  const opportunities = [];
  const pairs = makePairs(message.events);
  for (const pair of pairs) {
    const opportunity = calculator(pair[0], pair[1]);
    if (opportunity != null && opportunity.length) {
      opportunities.push(opportunity[0]);
      opportunities.push(opportunity[1]);
    }
  }
  if (DEBUG) console.timeEnd("opportunities");
  message.opportunities = opportunities;
  return message;
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