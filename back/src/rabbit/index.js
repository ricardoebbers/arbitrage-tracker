const amqp = require('amqplib')

const QUEUE_NAME = "arbitrage"

class RabbitBroker {
  static instance;

  constructor() {
  }

  async connect() {
    this.connection = await amqp.connect("amqp://localhost");
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(QUEUE_NAME, { durable: true })
    return this
  }

  async disconnect() {
    await this.channel.close()
    await this.connection.close()
    this.queue = null
    this.exchange = null
  }

  async subscribe(callback) {
    await this.channel.consume(QUEUE_NAME, callback)
  }

  async getAllAvailableMessages() {
    const messages = []
    let message = await this.channel.get(QUEUE_NAME)
    while (message) {
      messages.push(JSON.parse(message.content.toString()))
      message = await this.channel.get(QUEUE_NAME)
    }
    return messages
  }

  bufferToJson(message) {
    return JSON.parse(message.content.toString())
  }
}

module.exports = async function getInstance() {
  if (!RabbitBroker.instance) {
    console.log("Creating new instance of Rabbit")
    RabbitBroker.instance = new RabbitBroker()
    await RabbitBroker.instance.connect()
  }
  return RabbitBroker.instance
}