const express = require('express');
const router = express.Router();

// Base de données
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/db2.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
});

const {
  getNotes,
  getNotesByTag,
  getNote,
  searchNote,
  updateNote,
  deleteNote,
} = require('../controllers/notes.js');

// A ajouter : titre, user_id, tags, heure de création/modification
router.get('/create', (req, res) => {
  const sql_create = `CREATE TABLE IF NOT EXISTS notepad (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR NULL,
    text TEXT,
    tags VARCHAR NULL,
    user_id INT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NULL
  );`;

  db.run(sql_create, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

  const sql_create2 = `CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    mail VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    PRIMARY KEY(user_id),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NULL
  );`;

  db.run(sql_create2, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

  res.send('Création réussie');
});

// via la méthode de la requête préparée :
router.get('/insert', (req, res) => {
  const stmt = db.prepare(
    'INSERT INTO notepad title, text, tags VALUES (?, ?, ?)'
  );
  stmt.run(
    'Mon titre',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'MonTag'
  );
  stmt.finalize();

  const stmtUser = db.prepare('INSERT INTO user mail, password VALUES (?, ?)');
  stmtUser.run('sokhona.salaha@gmail.com', 'sokhona');
  stmtUser.finalize();

  res.send("Alimentation réussie de la table 'notepad'");
});


router.get('/', getNotes);

router.get('/get-notes', getNotesByTag);

router.get('/get-note', getNote);

router.post('/search-note', searchNote);

router.put('/save-note', updateNote);

router.delete('/delete-note', deleteNote);

module.exports = router;
