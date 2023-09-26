const express = require('express');
const router = express.Router();

const {
  logIn,
  signUp,
  updateUser,
  deleteUser,
} = require('../controllers/users.js');

router.get('/signup', (req, res) => {
  res.render('users/signup', { title: "Création d'un nouvel utilisateur" });
});

router.post('/signup', signUp);

router.put('/update', updateUser);

router.get('/login', (req, res) => {
  res.render('users/login', { title: 'Connexion' });
});

router.post('/login', logIn);

router.get('/logout', (req, res) => {
  res.clearCookie('authorization');
  res.redirect('/login');
});

router.delete('/:userID', deleteUser);

module.exports = router;
