const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.js');

router.get('/', getUsers);

router.get('/create', (req, res) => {
  res.render('users/create', {title: 'Création d\'un nouvel utilisateur'});
});

router.post('/create', createUser);

router.put('/update', updateUser);

router.get('/:userID', getUser);

router.delete('/:userID', deleteUser);

module.exports = router;
