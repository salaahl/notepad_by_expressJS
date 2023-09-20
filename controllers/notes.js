const Note = require('../models/Note.js');

const getNotes = (req, res) => {
  let sql =
    'SELECT id, title, text, tags, user_id, timestamp FROM notepad ORDER BY id DESC';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    res.render('notes', { title: 'Notes', notes: rows });
  });
};

const getNotesByTag = (req, res) => {
  // En réalité la fonction bis getNotes
  const sql =
    'SELECT id, title, text, tags, user_id, timestamp FROM notepad ORDER BY id DESC';

  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ note: rows }));
  });
};

const getNote = (req, res) => {
  const stmt =
    'SELECT id, title, text, tags, user_id, timestamp FROM notepad WHERE id = ?';
  var params = [req.body.id];

  db.get(stmt, params, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ note: row }));
  });
};

const searchNote = (req, res) => {
  let sql =
    'SELECT id, title, text, tags, user_id, timestamp FROM notepad WHERE title LIKE ? OR text LIKE ?';
  let searchConcat = '%' + req.body.search + '%';
  var params = [searchConcat, searchConcat];

  db.all(sql, params, (err, rows) => {
    if (err) {
      return console.error(err.message);
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ notes: rows }));
  });
};

const createNote = (req, res) => {
  Note.create(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const updateNote = (req, res) => {
  let stmt = null;
  let params = null;
  res.setHeader('Content-Type', 'application/json');

  // Si id ET titre et/ou texte = note existante = mettre à jour
  // Si titre et/ou texte existant MAIS pas de id = note inexistante = nouvelle note
  // Si titre et texte manquant = note vide = supprimer
  if ((req.body.title || req.body.text) && req.body.id) {
    stmt = 'UPDATE notepad SET title = ?, text = ? WHERE id = ?';
    params = [req.body.title, req.body.text, req.body.id];
  } else if ((req.body.title || req.body.text) && !req.body.id) {
    stmt = 'INSERT INTO notepad (title, text) VALUES (?, ?)';
    params = [req.body.title, req.body.text];
  } else {
    stmt = 'DELETE FROM notepad WHERE id = ?';
    params = [req.body.id];
  }

  db.run(stmt, params, function (err, row) {
    if (err) {
      console.error(err.message);
      return res.end(
        JSON.stringify({
          status: 'error',
          row: row,
          data: req.body,
          stmt: stmt,
          id: this.lastID,
        })
      );
    }

    res.end(
      JSON.stringify({
        status: 'success',
        row: row,
        data: req.body,
        stmt: stmt,
        id: this.lastID,
      })
    );
  });
};

const deleteNote = (req, res) => {
  let stmt = 'DELETE FROM notepad WHERE id = ?';
  let params = [req.body.id];

  db.run(stmt, params, function (err, row) {
    if (err) {
      console.error(err.message);
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        status: 'success',
        row: row,
        data: req.body,
        id: this.lastID,
      })
    );
  });
};

module.exports = {
  getNotes,
  getNotesByTag,
  getNote,
  searchNote,
  updateNote,
  deleteNote,
};
