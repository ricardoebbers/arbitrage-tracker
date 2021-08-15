const WebSocketServer = require('ws').Server;
const Rabbit = require('./rabbit');

const listeners = []
async function startServer() {
  const rabbit = await (new Rabbit()).initialize();
  wss = new WebSocketServer({port: 9191, path: '/'});

  wss.on('connection', async function(ws) {
    const history = await rabbit.getAllAvailableMessages()
    console.log(`New consumer, sending all ${history ? history.length : null} messages`)
    await ws.send(JSON.stringify(history));
    listeners.push(ws);

    ws.on("close", () => { 
      listeners.splice(listeners.indexOf(ws), 1);
    })
  });

  rabbit.subscribe((msg) => {
    if (!msg) return;
    const message = msg.content.toString()
    console.log(`New message: ${message}`);
    listeners.forEach(ws => ws.send(message));
  })
}

startServer()
console.log('Server started')