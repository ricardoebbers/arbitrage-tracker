const WebSocketServer = require('ws').Server;
const Rabbit = require('./rabbit');
const OpportunityDetector = require("./detector");

const DEBUG = false;

const listeners = []
let rabbitSubscribed = false;

async function startServer() {
  wss = new WebSocketServer({port: 9191, path: ''});
  const rabbit = await (new Rabbit()).initialize();

  wss.on('connection', async function(ws) {
    onNewConnection(ws, rabbit);
    if (!rabbitSubscribed) {   
      rabbitSubscribed = true;
      rabbit.subscribe((msg) => {
        onEvent(msg);
      })
    }

    ws.on("close", () => {
      console.log("Connection closed");
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
    if (message.opportunities.length) process.stdout.write("$");
    listeners.forEach(ws => ws.send(JSON.stringify(message)))
  } catch (e) {
    console.log(e)
    process.stdout.write("!")
  }
}

async function onNewConnection(ws, rabbit) {
  // TODO: Not working because messages are getting deleted on ACK
  // const history = await rabbit.getAllAvailableMessages();
  // process.stdout.write(history ? history.length.toString() : "-1")
  // for (let oldMessage of history) {
  //   await ws.send(JSON.stringify(oldMessage));
  // }
  process.stdout.write("*")
  listeners.push(ws);
}


startServer()
console.log('Server started')