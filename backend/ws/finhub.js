const WebSocket = require('ws');

let socket;
let clients = [];
const prices = new Map();

const subscribedSymbols = new Set();

function startFinnhubStream(apiKey) {
  socket = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

  socket.on('open', () => {
    console.log('✅ Finnhub WebSocket connected');
  });

  socket.on('message', (msg) => {
    const data = JSON.parse(msg.toString());
    if (data.type === 'trade') {
      data.data.forEach(trade => {
        // clients.forEach(client =>
        // {
        //   client.send(JSON.stringify(trade))
        // }
          // );

          const symbol = trade.s;
          const price = trade.p;

          // route per symbol
          updateSymbolPrice(symbol, price);
      });
    }
  });

  socket.on('close', () => {
    console.log('❌ Finnhub WebSocket closed. Reconnecting...');
    setTimeout(() => startFinnhubStream(apiKey), 3000);
  });
}

// function subscribe(symbol) {
//   socket.send(JSON.stringify({
//     type: 'subscribe',
//     symbol
//   }));
// }

function subscribe(symbol) {
  if (subscribedSymbols.has(symbol)) return;

  socket.send(JSON.stringify({
    type: 'subscribe',
    symbol
  }));

  subscribedSymbols.add(symbol);
  console.log('Subscribed:', symbol);
}


function addClient(ws) {
  clients.push(ws);
}

function removeClient(ws) {
  clients = clients.filter(c => c !== ws);
}


function updateSymbolPrice(symbol, price) {
  prices.set(symbol, price);

  // broadcast to frontend
  broadcast({
    symbol,
    price
  });
}

function broadcast(data) {
  const message = JSON.stringify(data);

  clients.forEach(client => {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send(message);
    }
  });
}

function unsubscribe(symbol) {
  if (!subscribedSymbols.has(symbol)) return;

  socket.send(JSON.stringify({
    type: 'unsubscribe',
    symbol
  }));

  subscribedSymbols.delete(symbol);
  console.log('Unsubscribed:', symbol);
}


module.exports = {
  startFinnhubStream,
  subscribe,
  addClient,
  removeClient,
  unsubscribe
};
