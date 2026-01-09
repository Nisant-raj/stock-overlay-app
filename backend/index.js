const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');

const {
  startFinnhubStream,
  subscribe,
  addClient,
  removeClient
} = require('./ws/finhub');

const app = express();
app.use(cors());

app.listen(3000, () => {
  console.log('Backend running on http://localhost:3000');
});

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', (ws) => {
  console.log('🟢 Angular connected to backend WS');

  addClient(ws);
  subscribe('BINANCE:BTCUSDT'); // change symbol dynamically later

  ws.on('close', () => {
    removeClient(ws);
  });
});
FINNHUB_API_KEY="d5g80jhr01qie3lh2a0gd5g80jhr01qie3lh2a10"
startFinnhubStream(FINNHUB_API_KEY);
