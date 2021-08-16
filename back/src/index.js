const WebSocketServer = require('ws').Server;
const rxAmqp = require('rx-amqplib');
const OpportunityDetector = require("./opportunities/detector");
const OpportunityAppender = require("./opportunities/appender");
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
  .flatMap(reply => reply.channel.consume(QUEUE_NAME, { noAck: true }))
  .filter(msg => msg && msg.content)
  .map(parseToJSON)
  .filter(msg => msg && msg.events)
  .map(OpportunityDetector)
  .map(OpportunityAppender)
  .map(msg => JSON.stringify(msg))
  .subscribe(sendToListeners, console.error, console.log)

function parseToJSON(message) {
  try {
    return JSON.parse(message.content.toString());
  } catch (e) {
    return null;
  }
}

function sendToListeners(msg) {
  listeners.forEach(ws => ws.send(msg))
}
