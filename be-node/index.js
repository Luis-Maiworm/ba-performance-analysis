const express = require('express');

const app = express();
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`be-node läuft auf Port ${PORT}`);
});
