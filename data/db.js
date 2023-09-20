// Base de données
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db3.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
});

module.exports = {sqlite3, db};