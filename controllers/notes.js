const Note = require('../models/Note.js');

const getNotes = (req, res) => {
  Note.find({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const getNotesByTag = (req, res) => {
  // Ajuster cette partie
  Note.find({ tags: '/${req.params.tag}/' })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const getNote = (req, res) => {
  Note.findOne({ _id: req.params.noteID })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: 'Note not found' }));
};

const createNote = (req, res) => {
  Note.create(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }));
};

const updateNote = (req, res) => {
  Note.findOneAndUpdate({ _id: req.params.noteID }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: 'Note not found' }));
};

const deleteNote = (req, res) => {
  Note.findOneAndDelete({ _id: req.params.noteID })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: 'Note not found' }));
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
