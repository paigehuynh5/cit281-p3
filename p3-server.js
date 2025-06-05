const express = require('express');
const app = express();
const { coinCombo, coinValue } = require('./p3-module');

// Serve static files from the 'public' folder
app.use(express.static('public'));

// /coincombo route
app.get('/coincombo', (req, res) => {
  const amount = parseInt(req.query.amount);
  if (isNaN(amount) || amount < 0) {
    return res.json({ error: 'Invalid amount, must be a number and greater than or equal to 0' });
  }
  const result = coinCombo(amount);
  res.json({ totalCombinations: result.length, combinations: result });
});

// /coinvalue route
app.get('/coinvalue', (req, res) => {
  const pennies = parseInt(req.query.pennies) || 0;
  const nickels = parseInt(req.query.nickels) || 0;
  const dimes = parseInt(req.query.dimes) || 0;
  const quarters = parseInt(req.query.quarters) || 0;
  const halves = parseInt(req.query.halves) || 0;
  const dollars = parseInt(req.query.dollars) || 0;

  const result = coinValue({ pennies, nickels, dimes, quarters, halves, dollars });
  res.json(result);
});

// 404 route handler for undefined routes
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start the server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
