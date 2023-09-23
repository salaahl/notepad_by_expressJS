const express = require('express');
const router = express.Router();

const {
  getNotes,
  getNote,
  createNote,
  searchNote,
  updateNote,
  deleteNote,
} = require('../controllers/notes-by-sqlite.js');

router.get('/', getNotes);

router.post('/', getNotes);

router.post('/get-note', getNote);

router.put('/create-note', createNote);

router.post('/search-note', searchNote);

router.put('/update-note', updateNote);

router.delete('/', deleteNote);

module.exports = router;
