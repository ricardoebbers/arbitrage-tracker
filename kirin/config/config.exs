import Config

config :amqp,
  connections: [
    myconn: [url: "amqp://localhost"]
  ],
  channels: [
    mychan: [connection: :myconn]
  ]
