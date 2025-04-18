const express = require('express');
const cors = require('cors');
const path = require('path');
const { getRankingData } = require('./services/googleSheetService');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/assets', express.static(path.join(__dirname, '../src/assets'))); 

app.use(cors());

// Rota que renderiza o frontend com EJS
app.get('/', async (req, res) => {
  try {
    const rows = await getRankingData();
    res.render('index', {rows});
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ranking' });
  }
});

// Rota para pegar os dados da API (caso precise)
app.get('/ranking-data', async (req, res) => {
  try {
    const rows = await getRankingData();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ranking' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
