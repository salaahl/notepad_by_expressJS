const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../controllers/middleware');

const {
  getNotes,
  getNote,
  createNote,
  searchNote,
  updateNote,
  deleteNote,
} = require('../controllers/notes.js');

router.get('/', isAuthenticated, getNotes);

router.post('/', isAuthenticated, getNotes);

router.post('/get-note', isAuthenticated, getNote);

router.put('/create-note', isAuthenticated, createNote);

router.post('/search-note', isAuthenticated, searchNote);

router.put('/update-note', isAuthenticated, updateNote);

router.delete('/', isAuthenticated, deleteNote);

module.exports = router;
