const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/prizes.db');

async function getChampionships() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM campeonatos', [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const jsonData = JSON.stringify(rows);
        resolve(jsonData);
      }
    });
  });
}

module.exports = getChampionships;