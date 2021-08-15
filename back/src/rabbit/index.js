const amqp = require('amqplib');
require('dotenv').config();

const QUEUE_NAME = process.env.QUEUE_NAME;
const RABBITMQ_URL = process.env.RABBITMQ_URL;

module.exports = class RabbitBroker {
  async initialize() {
    console.log("Connecting to Rabbit on queue: " + QUEUE_NAME);
    this.connection = await amqp.connect(RABBITMQ_URL);
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(QUEUE_NAME, { durable: true });
    return this;
  }

  async subscribe(callback) {
    return await this.channel.consume(QUEUE_NAME, callback, { noAck: true });
  }
}