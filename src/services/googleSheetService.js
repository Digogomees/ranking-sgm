// const fetch = require('node-fetch');

const sheetID = "1az4rNEWXpwN5baP90ODz1pyTK7RUhpXHNqWZ4V_-tF4";
const sheetName = "Página1";
const googleSheetsURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?sheet=${sheetName}`;

async function fetchSheetData() {
  const response = await fetch(googleSheetsURL);
  if (!response.ok) throw new Error('Erro ao buscar dados');
  const text = await response.text();
  return JSON.parse(text.substring(47).slice(0, -2));
}

async function getRankingData() {
  const json = await fetchSheetData();

  const cols = json.table.cols;
  const nomeIndex = cols.findIndex(col => col.label.toLowerCase() === 'nomes');
  const totalIndex = cols.findIndex(col => col.label.toLowerCase() === 'total');

  if (nomeIndex === -1 || totalIndex === -1) throw new Error('Colunas não encontradas');

  const rows = json.table.rows.map(row => ({
    nome: row.c[nomeIndex]?.v || '',
    total: row.c[totalIndex]?.v || 0
  }));

  return rows.sort((a, b) => b.total - a.total);
}

module.exports = {
  getRankingData
};
