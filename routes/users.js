const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/notes.js');

router.get('/', getUsers);

router.post('/get-notes', getNotesAsynchronously);

router.post('/get-note', getUser);

router.get('/create-note', createUser);

router.put('/', updateUser);

router.delete('/', deleteUser);

module.exports = router;
