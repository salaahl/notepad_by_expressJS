const express = require('express');
const app = express();
const port = 3010;
const path = require('path');

// Base de données
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data/db.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connexion réussie à la base de données 'db.sqlite'");
});

// Indispensable pour "ecouter" l'application
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Equivalent du dossier /public
app.use(express.static('static'));

// Imports necessaires aux requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Déclaration du dossier /views et initialisation des fichiers .pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Explications sur les requêtes dans la partie CRUD
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM notepad';

  db.all(sql, [], (err, rows) => {
    if (err) {
      const notes = [
        {
          note_id: '1',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
          note_id: '2',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
        {
          note_id: '3',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        },
      ];
      console.error(err.message);
      res.render('notes', { title: 'Home', notes: notes });
    }
    res.render('notes', { title: 'Home', notes: rows });
  });
});

/*
// Version normale
app.post('/get-notes', (req, res) => {
  const stmt = 'SELECT * FROM notepad WHERE note_id = ?';
  var params = [req.body.id];

  db.get(stmt, params, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ id: row.note_id, text: row.text }));
  });
});
*/

// Version stackblitz
app.post('/get-notes', (req, res) => {
  const note = {
    note_id: '1',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  };

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ id: note.note_id, text: note.text }));
});

app.post('/update-note', (req, res) => {
  const stmt = 'UPDATE notepad SET text = ? FROM notepad WHERE note_id = ?';
  var params = [req.body.text, req.body.id];

  db.run(stmt, params, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });
  db.close();

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ status: 'mettre le statut ici' }));
});

// Version stackblitz
app.post('/update-note', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ data: req.body }));
});

app.get('/options', (req, res) => {
  res.render('options', {
    title: 'options',
  });
});

/*
CRUD :

app.get('/create', (req, res) => {
  const sql_create = `CREATE TABLE IF NOT EXISTS notepad (
    note_id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT
  );`;

  db.run(sql_create, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Création réussie de la table 'notepad'");
  });

  res.send('Création réussie');
});

// via la méthode de la requête préparée :
app.get('/insert', (req, res) => {
  const stmt = db.prepare('INSERT INTO notepad (text) VALUES (?)');
  stmt.run(
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  );
  stmt.finalize();

  res.send("Alimentation réussie de la table 'notepad'");
});

app.get('/read', (req, res) => {
  const sql = 'SELECT * FROM notepad';

  
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render('read', { title: 'Home', model: rows });
  });
});

app.get('/read/:note_id', (req, res) => {
  const stmt = 'SELECT * FROM notepad WHERE note_id = ?';
  var params = [req.params.note_id]

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
