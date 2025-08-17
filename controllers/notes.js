const Note = require("../models/Note.js");
const ObjectId = require("mongodb").ObjectId;

const getNotes = async (req, res) => {
  try {
    const user = req.user.email;
    const currentPage = parseInt(req.query.page) || 1;
    const limit = 12;
    const skip = (currentPage - 1) * limit;

    const notes = await Note.find({ user: user })
      .sort({ updated: -1 }) // tri par date de mise à jour descendante
      .limit(limit)
      .skip(skip);

    const totalNotes = await Note.countDocuments({ user });
    const totalPages = Math.ceil(totalNotes / limit);

    // Si la requête est de type POST, alors renvoyer sous forme de JSON
    if (req.method == "POST") {
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          notes: notes,
          totalNotes: totalNotes,
          currentPage: currentPage,
          totalPages: totalPages,
        })
      );
    } else {
      res.render("notes", {
        h1: "Notes",
        notes: notes,
        totalNotes: totalNotes,
        currentPage: currentPage,
        totalPages: totalPages,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const getNote = async (req, res) => {
  const findOneQuery = { _id: new ObjectId(req.body.id) };

  try {
    const note = await Note.findOne(findOneQuery);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ note: note }));
  } catch (err) {
    console.error(`Something went wrong trying to find one document: ${err}\n`);
  }
};

const searchNote = async (req, res) => {
  const search = req.body.search;

  // Le "i" de $options est pour "insensitive case"
  const findQuery = {
    user: req.user.email,
    $or: [
      { title: { $regex: search, $options: "i" } },
      { text: { $regex: search, $options: "i" } },
    ],
  };

  try {
    const notes = await Note.find(findQuery).limit(36);

    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        notes: notes,
      })
    );
  } catch (err) {
    console.error(err);
  }
};

const createNote = async (req, res) => {
  const content = new Note({
    title: req.body.title,
    text: req.body.text,
    user: req.user.email,
  });

  try {
    await content.save();
    res.end();
  } catch (err) {
    console.error(err);
  }
};

const updateNote = async (req, res) => {
  const note = { _id: new ObjectId(req.body.id) };
  const noteContent = {
    $set: { title: req.body.title, text: req.body.text, updatedAt: new Date() },
  };

  // The following options document specifies that we want the *updated*
  // document to be returned. By default, we get the document as it was *before*
  // the update.
  const options = { returnOriginal: false };

  try {
    const updateResult = await Note.findOneAndUpdate(
      note,
      noteContent,
      options
    );
    res.end();
  } catch (err) {
    console.error(err);
  }
};

const deleteNote = async (req, res) => {
  try {
    const deleteResult = await Note.deleteOne({
      _id: new ObjectId(req.body.id),
    });

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: "Note deleted" }));
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
