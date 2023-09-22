const express = require('express');
const router = express.Router();

const {
  getNotes,
  getNote,
  createNote,
  searchNotes,
  updateNote,
  deleteNote,
} = require('../controllers/notes.js');

router.get('/', getNotes);

router.post('/', getNotes);

router.post('/get-note', getNote);

router.put('/create-note', createNote);

router.post('/search-note', searchNotes);

router.put('/update-note', updateNote);

router.delete('/', deleteNote);

module.exports = router;
