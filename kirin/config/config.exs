import Config

config :amqp,
  connections: [
    myconn: [url: "amqp://localhost"]
  ],
  channels: [
    mychan: [connection: :myconn]
  ]

config :streamer,
  exchanges: ["binance", "huobi"]

config :publisher,
  exchanges: ["binance", "huobi"]
