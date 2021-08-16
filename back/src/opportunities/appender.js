const DEBUG = false;
const DEBUG_TIMES = false;

const pastOpportunities = {}

module.exports = function findOpportunities(message) {
  if (DEBUG_TIMES) console.time("appender");
  for (opportunity of message.opportunities) {
    appendPastData(opportunity, message.timestamp);
    // Add more data as needed
  }
  if (DEBUG_TIMES) console.timeEnd("appender");
  return message
}

function appendPastData(current, timestamp) {
  const past = getOrSavePastOpportunity(opportunity);
  current.positive = isProfitable(current);
  if (current.positive) {
    past.duration += opportunity.duration;
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
