const Note = require('../models/Note.js');
const { client } = require('../data/mongoDB.js');
const ObjectId = require('mongodb').ObjectId;

// Provide the name of the database and collection you want to use.
// If the database and/or collection do not exist, the driver and Atlas
// will create them automatically when you first write data.
const database = client.db('notepad');
const collection = database.collection('notes');

const getNotes = async (req, res) => {
  try {
    const notes = await collection.find({}).toArray();
    // Si la requête est de type POST, alors renvoyer sous forme de JSON
    if (req.method == 'POST') {
      console.log(req.method)
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ note: notes }));
    } else {
      console.log(req.method)
      res.render('notes', { title: 'Notes', notes: notes });
    }
  } catch (err) {
    console.error(err);
  }
};

const getNote = async (req, res) => {
  console.log(req.body.id)
  const findOneQuery = { _id: new ObjectId(req.body.id) };

  try {
    const note = await collection.findOne(findOneQuery);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ note: note }));
  } catch (err) {
    console.error(`Something went wrong trying to find one document: ${err}\n`);
  }
};

const searchNotes = async (req, res) => {
  // En faire de même avec le colonne "title"
  const findQuery = { title: `/${req.body.search}/` };

  try {
    const notes = await collection.find(findQuery).toArray();

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ note: notes }));
  } catch (err) {
    console.error(err);
  }
};

const createNote = async (req, res) => {
  const content = new Note({
    title: req.body.title,
    text: req.body.text,
  });

  try {
    const note = await collection.insertOne(content);
  } catch (err) {
    console.error();
  }
};

const updateNote = async (req, res) => {
  const note = { _id: new ObjectId(req.body.id) };
  const noteContent = { $set: { title: req.body.title, text: req.body.text } };

  // The following options document specifies that we want the *updated*
  // document to be returned. By default, we get the document as it was *before*
  // the update.
  const options = { returnOriginal: false };

  try {
    const updateResult = await collection.findOneAndUpdate(
      note,
      noteContent,
      options
    );
  } catch (err) {
    console.error(err);
  }
};

const deleteNote = async (req, res) => {
  try {
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(req.body.id) });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'Note deleted' }));
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  searchNotes,
  updateNote,
  deleteNote,
};
