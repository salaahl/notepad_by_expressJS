const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true, maxLength: 100 },
  text: { type: String, required: true, maxLength: 100 },
  tags: { type: String, required: false, maxLength: 100 },
  user_id: { type: Number, required: false, maxLength: 100 },
  updated: { type: Date, required: true, default: Date.now }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = Note;