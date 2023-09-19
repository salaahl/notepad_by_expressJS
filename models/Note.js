const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: String,
  text: String,
  tags: String,
  user_id: Number
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;