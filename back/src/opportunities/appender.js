const DEBUG = false;
const DEBUG_TIMES = false;

const pastExchanges = {}
const pastOpportunities = {}

module.exports = function appendData(message) {
  if (DEBUG_TIMES) console.time("appender");
  for (exchange of message.events) {
    appendPastExchangeData(exchange);
  }
  for (opportunity of message.opportunities) {
    appendPastOpportunityData(opportunity, message.timestamp);
    // Add more data as needed
  }
  if (DEBUG_TIMES) console.timeEnd("appender");
  return message
}

function appendPastExchangeData(current) {
  let past = pastExchanges[current.exchange]
  if (past == null) {
    past = { volumes: [] }
    pastExchanges[current.exchange] = past
  }
  past.volumes.push(current.volume);
  if (past.volumes.length > 10) past.volumes.shift();
  switch (past.volumes.filter(v => v !== 0).length) {
    case 10:
    case 9:
      current.activity = "ON FIRE!"
      break
    case 8:
    case 7:
    case 6:
      current.activity = "High"
      break
    case 5:
    case 4:
    case 3:
    case 2:
    case 1:
      current.activity = "Medium"
      break
    case 0:
      current.activity = "Low"
      break
    default:
      current.activity = "?"
  } 
}

function appendPastOpportunityData(current, timestamp) {
  const past = getOrSavePastOpportunity(opportunity);
  current.positive = isProfitable(current);
  if (current.positive) {
    past.duration += 1;
    if (!past.since) past.since = timestamp;
  } else {
    past.duration = 0;
    past.since = null
  }
  current.duration = past.duration;
  current.since = past.since;
  if (DEBUG && current.positive) console.log(current)
}

function getOrSavePastOpportunity(opportunity) {
  const key = `${opportunity.buyAt}-${opportunity.sellAt}`;
  if (pastOpportunities[key]) return pastOpportunities[key];
  pastOpportunities[key] = { since: null, duration: 0 }
  return pastOpportunities[key];
}

function isProfitable(current) {
  return current.profit > 0;
}
