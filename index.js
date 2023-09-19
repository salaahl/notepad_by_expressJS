const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const notes_routes = require('./routes/notes.js');
const users_routes = require('./routes/users.js');

// Indispensable pour "ecouter" l'application
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Import des routes. Le 1er paramètre est un préfixe
app.use('/', notes_routes);
app.use('/users/', users_routes);

// Equivalent du dossier /public
app.use(express.static('static'));

// Imports necessaires aux requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Déclaration du dossier /views et initialisation des fichiers .pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/*
// Base de données
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/db2.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
});

// Explications sur les requêtes dans la partie CRUD
app.get('/', (req, res) => {
  let sql =
    'SELECT id, title, text, tags, user_id, timestamp FROM notepad ORDER BY id DESC';

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
    }
    res.render('notes', { title: 'Notes', notes: rows });
  });
});

// Récupère le contenu d'une note
app.post('/get-note', (req, res) => {
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
});

// Récupère toutes les notes de façon asynchrone
app.post('/get-notes', (req, res) => {
  const sql =
    'SELECT id, title, text, tags, user_id, timestamp FROM notepad ORDER BY id DESC';

  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ note: rows }));
  });
});

// Recherche d'une note
app.post('/search-note', (req, res) => {
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
});

// Enregistre le contenu d'une note
app.post('/save-note', (req, res) => {
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
});

// Enregistre le contenu d'une note
app.post('/delete-note', (req, res) => {
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
});

app.get('/options', (req, res) => {
  res.render('options', {
    title: 'options',
  });
});

// A ajouter : titre, user_id, tags, heure de création/modification
app.get('/create', (req, res) => {
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
app.get('/insert', (req, res) => {
  const stmt = db.prepare(
    'INSERT INTO notepad title, text, tags VALUES (?, ?, ?)'
  );
  stmt.run(
    'Mon titre',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    'MonTag'
  );
  stmt.finalize();

  const stmtUser = db.prepare(
    'INSERT INTO user mail, password VALUES (?, ?)'
  );
  stmtUser.run(
    'sokhona.salaha@gmail.com',
    'sokhona'
  );
  stmtUser.finalize();

  res.send("Alimentation réussie de la table 'notepad'");
});

/*
CRUD :

app.get('/read', (req, res) => {
  const sql = 'SELECT id, title, text, tags, user_id, timestamp FROM notepad';

  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render('read', { title: 'Home', model: rows });
  });
});

app.get('/read/:id', (req, res) => {
  const stmt = 'SELECT id, title, text, tags, user_id, timestamp FROM notepad WHERE id = ?';
  var params = [req.params.id]

  /* 
  Le 1° paramètre est la requête SQL à exécuter
  Le 2° paramètre est un tableau avec les variables nécessaires à la requête (joue le rôle d'une requête préparée ?). Ici, la valeur "[]" est employée parce que la requête n'a pas besoin de variable.
  Le 3° paramètre est une fonction callback appelée après l'exécution de la requête SQL.
  "(err, rows)" correspond aux paramètres passés à la fonction callback. "err" contient éventuellement un objet erreur et "rows" est un tableau contenant la liste des lignes renvoyées par le SELECT.
  */
/*
  db.get(stmt, params, (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render('read', { title: 'Home', model: rows });
  });
});
*/

/*
const elasticsearch = require('elasticsearch');
const client = elasticsearch.Client({
  host: 'localhost:9200',
});

client
  .search({
    index: 'books',
    type: 'book',
    body: {
      query: {
        multi_match: {
          query: 'express js',
          fields: ['title', 'description'],
        },
      },
    },
  })
  .then(
    (response) => {
      const hits = response.hits.hits;
    },
    (error) => {
      console.trace(error.message);
    }
  );
*/

/*
const express = require('express');
const app = express();
const port = 3010;
const path = require('path');

app.use(express.static('static'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

module.exports = app;

// Import the mongoose module
const mongoose = require("mongoose");

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = "mongodb://127.0.0.1/my_database";

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
*/
