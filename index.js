require('dotenv').config();

const express = require('express');
const app = express();
const port = 3010;
const path = require('path');
const mongoose = require('mongoose');
const notes_routes = require('./routes/notes.js');
//const products_routes = require('./routes/products.js');

/*
Initialisation de la base de données pour des produits
mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => app.listen(5000))
  .catch((err) => console.log(Error));
*/

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
//app.use('/products', products_routes);

// Déclaration du dossier /views et initialisation des fichiers .pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
