const express = require('express');
const router = express.Router();

const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require('../controllers/notes.js');

router.get('/', getNotes);

router.get('/:noteID', getNote);

router.post('/', createNote);

router.put('/:noteID', updateNote);

router.delete('/:noteID', deleteNote);

module.exports = router;
