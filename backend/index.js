const express = require('express');
const cors = require('cors');
const YahooFinance = require('yahoo-finance2').default;

const yahooFinance = new YahooFinance(); // 🔥 REQUIRED

const app = express();
app.use(cors());

app.get('/api/stock/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const quote = await yahooFinance.quote(symbol);

    res.json({
      symbol,
      price: quote.regularMarketPrice,
      change: quote.regularMarketChangePercent
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stock/:symbol/history', async (req, res) => {
  try {
    const symbol = req.params.symbol;

    const result = await yahooFinance.chart(symbol, {
      period1: '2024-01-01',
      interval: '1d'
    });

    const prices = result.quotes.map(q => ({
      time: q.date.toISOString().split('T')[0],
      value: q.close
    }));

    res.json(prices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('✅ Backend running on http://localhost:3000');
});
