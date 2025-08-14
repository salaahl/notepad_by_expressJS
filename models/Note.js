const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: false, maxLength: 100 },
  text: { type: String, required: false, maxLength: 5000 },
  tags: { type: String, required: false, maxLength: 100 },
  updated: { type: Date, required: true, default: Date.now },
  user: {
    type: mongoose.Schema.Types.String,
    ref: "User",
    required: true,
  },
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
