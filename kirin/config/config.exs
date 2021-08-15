import Config

config :amqp,
  connections: [
    myconn: [url: "amqp://localhost"]
  ],
  channels: [
    mychan: [connection: :myconn]
  ],
  expiration_time: 60_000,
  queue_name: "arbitrage"

config :streamer,
  exchanges: ["binance", "huobi"]

config :publisher,
  exchanges: ["binance", "huobi"]
