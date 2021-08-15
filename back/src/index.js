const WebSocketServer = require('ws').Server;
const Rabbit = require('./rabbit');
const OpportunityDetector = require("./detector");
require('dotenv').config();

const WS_PORT = process.env.WS_PORT;
const WS_PATH = process.env.WS_PATH;


const DEBUG = false;

const listeners = []
let rabbitSubscribed = false;

async function startServer() {
  wss = new WebSocketServer({ port: WS_PORT, path: WS_PATH });
  const rabbit = await (new Rabbit()).initialize();

  wss.on('connection', async function(ws) {
    process.stdout.write("*")
    listeners.push(ws);

    if (!rabbitSubscribed) {   
      rabbitSubscribed = true;
      rabbit.subscribe((msg) => {
        onEvent(msg);
      })
    }

    ws.on("close", () => {
      process.stdout.write("x")
      listeners.splice(listeners.indexOf(ws), 1);
    })
  });
}

async function onEvent(msg) {
  process.stdout.write(".")
  if (!msg) return;
  try {
    const message = JSON.parse(msg.content.toString())
    if (!message.events) return process.stdout.write("?");
    if (DEBUG) console.log(message.events);
    message.opportunities = OpportunityDetector(message.events)
    listeners.forEach(ws => ws.send(JSON.stringify(message)))
  } catch (e) {
    console.log(e)
    process.stdout.write("!")
  }
}

startServer()
console.log('Server started')
