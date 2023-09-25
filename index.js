require('dotenv').config();

const express = require('express');
var cookieParser = require('cookie-parser');
const app = express();
const port = 3010;
const path = require('path');
const initializeConnection = require('./data/mongoose.js');
const morgan = require('morgan');
const cors = require('cors');
const notes_routes = require('./routes/notes.js');
const users_routes = require('./routes/users.js');

const PORT = process.env.PORT || 5001

// Indispensable pour "ecouter" l'application
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

// GLOBAL MIDDLEWARE
app.use(cors()); // add cors headers
app.use(morgan('tiny')); // log the request for debugging

// Equivalent du dossier /public
app.use(express.static('static'));

// Imports necessaires aux requêtes
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import des routes. Le 1er paramètre est un préfixe
app.use('', notes_routes);
app.use('', users_routes);

// Déclaration du dossier /views et initialisation des fichiers .pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
