const express = require('express');
const router = express.Router();

const {
  createMongooseTable,
  getNotes,
  getNotesAsynchronously,
  getNote,
  createNote,
  searchNote,
  updateNote,
  deleteNote,
} = require('../controllers/notes.js');

router.get('/mongoose-table', createMongooseTable);

router.get('/', getNotes);

router.post('/get-notes', getNotesAsynchronously);

router.post('/get-note', getNote);

router.get('/create-note', createNote);

router.post('/search-note', searchNote);

router.put('/', updateNote);

router.delete('/', deleteNote);

module.exports = router;
