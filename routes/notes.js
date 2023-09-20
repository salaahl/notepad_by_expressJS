const express = require('express');
const router = express.Router();
// A supprimer une fois que j'aurai cleané ce fichier
const {db} = require('../data/db.js');

const {
  getNotes,
  getNotesAsynchronously,
  getNote,
  createNote,
  searchNote,
  updateNote,
  deleteNote,
} = require('../controllers/notes.js');

// A ajouter : titre, user_id, tags, heure de création/modification
router.get('/create-table', (req, res) => {
  const sql_create = `CREATE TABLE IF NOT EXISTS notepad (
    note_id INTEGER PRIMARY KEY AUTOINCREMENT,
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

  res.send('Création réussie');
});

router.get('/', getNotes);

router.post('/get-notes', getNotesAsynchronously);

router.post('/get-note', getNote);

router.get('/create-note', createNote);

router.post('/search-note', searchNote);

router.put('/', updateNote);

router.delete('/', deleteNote);

module.exports = router;
