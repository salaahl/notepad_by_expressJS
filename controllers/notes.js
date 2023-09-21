const Note = require('../models/Note.js');
const { db } = require('../data/sqlite3.js');
const { client } = require('../data/mongoDB.js');

// Provide the name of the database and collection you want to use.
// If the database and/or collection do not exist, the driver and Atlas
// will create them automatically when you first write data.
const database = client.db('notepad');
const collection = database.collection('notes');

const getNotes = async (req, res) => {
  const findQuery = {};

  try {
    const findResult = await collection.find(findQuery);
    if (findResult === null) {
      console.log(
        "Couldn't find any recipes that contain 'potato' as an ingredient.\n"
      );
    } else {
      console.log(
        `Found a recipe with 'potato' as an ingredient:\n${JSON.stringify(
          findResult
        )}\n`
      );
    }
    console.log(JSON.stringify(
      findResult
    ))
    res.render('notes', { title: 'Notes', notes: findResult });
  } catch (err) {
    console.error(`Something went wrong trying to find one document: ${err}\n`);
  }
};

const getNotesAsynchronously = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ note: rows }));
};

const getNote = async (req, res) => {
  // We can also find a single document. Let's find the first document
  // that has the string "potato" in the ingredients list.
  const findOneQuery = { _id: req.body.id };

  try {
    const findOneResult = await collection.findOne(findOneQuery);
    if (findResult === null) {
      console.log(
        "Couldn't find any recipes that contain 'potato' as an ingredient.\n"
      );
    } else {
      console.log(
        `Found a recipe with 'potato' as an ingredient:\n${JSON.stringify(
          findOneResult
        )}\n`
      );
    }
  } catch (err) {
    console.error(`Something went wrong trying to find one document: ${err}\n`);
  }
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ note: row }));
};

const searchNote = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ notes: rows }));
};

const createNote = async (req, res) => {
  const note = {
    title: req.body.title,
    text: req.body.text,
  };

  const noteBis = new Note({
    title: "Note test",
    text: "Lorem.",
  });

  try {
    // Plûtot utiliser la méthode .save() pour notamment faire fonctionner les validateurs
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

const updateNote = (req, res) => {};

const deleteNote = (req, res) => {};

module.exports = {
  getNotes,
  getNotesAsynchronously,
  getNote,
  createNote,
  searchNote,
  updateNote,
  deleteNote,
};
