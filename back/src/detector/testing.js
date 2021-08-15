const calculator = require("./")


const coins = [
  {
    "exchange":"binance",
    "pair":"btc/usd",
    "price":0.00000326,
    "volume":4294,
    "priceUsd":0.1552010053893826
  },
  {
    "exchange":"huobi",
    "pair":"btc/usd",
    "price":0.00000494,
    "volume":1416,
    "priceUsd":0.1558465498462189
  }
];

console.log(calculator(coins, 0.10, 100))