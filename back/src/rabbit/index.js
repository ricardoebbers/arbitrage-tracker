const amqp = require('amqplib')

const QUEUE_NAME = "arbitrage"

module.exports = class RabbitBroker {  
  async initialize() {
    console.log("Connecting to Rabbit on queue: " + QUEUE_NAME)
    this.connection = await amqp.connect("amqp://localhost");
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(QUEUE_NAME, { durable: true })
    return this;
  }

  async subscribe(callback) {
    await this.channel.consume(QUEUE_NAME, callback, { noAck: true })
  }

  async getAllAvailableMessages() {
    const messages = []
    let message = await this.channel.get(QUEUE_NAME, { noAck: true })
    while (message) {
      messages.push(message.content.toString())
      message = await this.channel.get(QUEUE_NAME, { noAck: true })
    }
    return messages
  }
}