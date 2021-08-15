const Rabbit = require('./rabbit');

async function subscribe() {
  const rabbit = await Rabbit()
  console.log(await rabbit.getAllAvailableMessages())
  rabbit.subscribe((msg) => {
    console.log('Message:', msg.content.toString())
  })
}


subscribe()