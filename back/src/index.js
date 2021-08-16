const WebSocketServer = require('ws').Server;
const rxAmqp = require('rx-amqplib');
const OpportunityDetector = require("./detector");
require('dotenv').config();

const WS_PORT = process.env.WS_PORT;
const WS_PATH = process.env.WS_PATH;
const QUEUE_NAME = process.env.QUEUE_NAME;
const RABBITMQ_URL = process.env.RABBITMQ_URL;

const listeners = []

console.log("Starting WS server...")
wss = new WebSocketServer({ port: WS_PORT, path: WS_PATH });
wss.on('connection', async function(ws) {
  listeners.push(ws);
  ws.on("close", () => {
    listeners.splice(listeners.indexOf(ws), 1);
  })
});

console.log("Connecting to Rabbit...")
rxAmqp.newConnection(RABBITMQ_URL)
  .flatMap(connection => connection.createChannel())
  .flatMap(channel => channel.assertQueue(QUEUE_NAME, { durable: true }))
  .flatMap(reply => reply.channel.prefetch(59))
  .flatMap(reply => reply.channel.consume(QUEUE_NAME, { noAck: true }))
  .doOnNext(msg => onEvent(msg))
  .subscribe();

async function onEvent(msg) {
  if (!msg) return;
  try {
    const message = JSON.parse(msg.content.toString())
    if (!message.events) return console.log("Invalid message: "  + message);
    message.opportunities = OpportunityDetector(message.events)
    listeners.forEach(ws => ws.send(JSON.stringify(message)))
  } catch (e) {
    console.log(e)
  }
}
