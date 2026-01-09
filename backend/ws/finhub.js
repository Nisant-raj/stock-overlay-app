const WebSocket = require('ws');

let socket;
let clients = [];

function startFinnhubStream(apiKey) {
  socket = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

  socket.on('open', () => {
    console.log('✅ Finnhub WebSocket connected');
  });

  socket.on('message', (msg) => {
    const data = JSON.parse(msg.toString());
    if (data.type === 'trade') {
      data.data.forEach(trade => {
        clients.forEach(client =>
        {
          client.send(JSON.stringify(trade))
        }
        );
      });
    }
  });

  socket.on('close', () => {
    console.log('❌ Finnhub WebSocket closed. Reconnecting...');
    setTimeout(() => startFinnhubStream(apiKey), 3000);
  });
}

function subscribe(symbol) {
  socket.send(JSON.stringify({
    type: 'subscribe',
    symbol
  }));
}

function addClient(ws) {
  clients.push(ws);
}

function removeClient(ws) {
  clients = clients.filter(c => c !== ws);
}

module.exports = {
  startFinnhubStream,
  subscribe,
  addClient,
  removeClient
};
