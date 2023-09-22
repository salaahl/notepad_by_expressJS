const Note = require('../models/Note.js');
const { client } = require('../data/mongoDB.js');

// Provide the name of the database and collection you want to use.
// If the database and/or collection do not exist, the driver and Atlas
// will create them automatically when you first write data.
const database = client.db('notepad');
const collection = database.collection('notes');

const getNotes = async (req, res) => {
  try {
    const findResult = await collection.find({});
    // Si la requête est de type POST, alors renvoyer sous forme de JSON
    if (1 === 2) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ note: findResult }));
    } else {
      res.render('notes', { title: 'Notes', notes: findResult });
    }
  } catch (err) {
    console.error(err);
  }
};

const getNote = async (req, res) => {
  const findOneQuery = { _id: req.body.id };

  try {
    const findOneResult = await collection.findOne(findOneQuery);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ note: findOneResult }));
  } catch (err) {
    console.error(`Something went wrong trying to find one document: ${err}\n`);
  }
};

const searchNote = async (req, res) => {
  // En faire de même avec le colonne "title"
  const findQuery = { text: '/' + req.body.search + '/' };

  try {
    const findResult = await collection.find(findQuery);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ note: findResult }));
  } catch (err) {
    console.error(err);
  }
};

const createNote = async (req, res) => {
  const note = {
    title: req.body.title,
    text: req.body.text,
  };

  const noteBis = {
    title: 'Note test',
    text: 'Lorem.',
  };

  const noteWithSchema = new Note({
    title: 'Note test',
    text: 'Lorem.',
  });

  try {
    const insertOneResult = await collection.insertOne(noteBis);
    console.log(
      `${insertOneResult.insertedCount} note successfully inserted.\n`
    );
  } catch (err) {
    console.error(
      `Something went wrong trying to insert the new note: ${err}\n`
    );
  }
};

const updateNote = async (req, res) => {
  const findOneQuery = { _id: req.body.id };
  const updateDoc = { $set: { title: req.body.title, text: req.body.text } };

  // The following updateOptions document specifies that we want the *updated*
  // document to be returned. By default, we get the document as it was *before*
  // the update.
  const updateOptions = { returnOriginal: false };

  try {
    const updateResult = await collection.findOneAndUpdate(
      findOneQuery,
      updateDoc,
      updateOptions
    );
  } catch (err) {
    console.error(err);
  }
};

const deleteNote = async (req, res) => {
  const deleteQuery = { _id: req.body.id };

  try {
    const deleteResult = await collection.deleteOne(deleteQuery);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getNotes,
  getNote,
  createNote,
  searchNote,
  updateNote,
  deleteNote,
};
