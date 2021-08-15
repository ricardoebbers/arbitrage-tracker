import Config

config :amqp,
  connection: [url: System.get_env("RABBITMQ_URL", "amqp://guest:guest@localhost:5672")],
  channel: [connection: :default],
  expiration_time: System.get_env("EXPIRATION_TIME", "60000") |> String.to_integer(),
  queue_name: System.get_env("QUEUE_NAME", "arbitrage")

config :streamer,
  # exchanges with streaming: "binance,huobi,hitbtc,zb,gdax,bitfinex,bitstamp,poloniex,gemini,luno,bitso,therocktrading,coinmate"
  exchanges: System.get_env("EXCHANGES", "binance,huobi") |> String.split(",")

config :publisher,
  exchanges: System.get_env("EXCHANGES", "binance,huobi") |> String.split(",")
