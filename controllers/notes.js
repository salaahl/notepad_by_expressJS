const notes = require('../data/notes.js');

const getNotes = (req, res) => {
  res.json(notes);
};

const getNote = (req, res) => {
  const id = Number(req.params.noteID);
  const note = notes.find((note) => note.id === id);

  if (!note) {
    return res.status(404).send('Note not found');
  }
  res.json(note);
};

const createNote = (req, res) => {
  const newNote = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
  };
  notes.push(newNote);
  res.status(201).json(newNote);
};

const updateNote = (req, res) => {
  const id = Number(req.params.noteID);
  const index = notes.findIndex((note) => note.id === id);
  const updatedNote = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
  };

  notes[index] = updatedNote;
  res.status(200).json('Note updated');
};

const deleteNote = (req, res) => {
  const id = Number(req.params.noteID);
  const index = notes.findIndex((note) => note.id === id);
  notes.splice(index, 1);
  res.status(200).json('Note deleted');
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
