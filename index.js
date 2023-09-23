require('dotenv').config();

const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const mongooseConnect = require('./data/mongoose.js');
const notes_routes = require('./routes/notes.js');
const users_routes = require('./routes/users.js');

// Indispensable pour "ecouter" l'application
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Equivalent du dossier /public
app.use(express.static('static'));

// Imports necessaires aux requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Import des routes. Le 1er paramètre est un préfixe
app.use('', notes_routes);
app.use('/users', users_routes);

// Déclaration du dossier /views et initialisation des fichiers .pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
