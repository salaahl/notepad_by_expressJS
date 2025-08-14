const Note = require("../models/Note.js");
const ObjectId = require("mongodb").ObjectId;
const crypto = require("crypto");
const algorithm = "aes-256-gcm";
const key = Buffer.from(process.env.ENCRYPTION_KEY, "hex");
const IV_LENGTH = 16;

// Fonction de chiffrement
const encrypt = (text) => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted}`;
};

// Fonction de déchiffrement
const decrypt = (text) => {
  try {
    const textParts = text.split(":");
    const iv = Buffer.from(textParts[0], "hex");
    const authTag = Buffer.from(textParts[1], "hex");
    const encryptedText = textParts[2];
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  } catch (error) {
    // Si la balise d'authentification n'est pas valide, une erreur sera levée.
    // Cela indique que les données ont été altérées !
    console.error(
      "Erreur de déchiffrement : les données sont peut-être corrompues ou altérées.",
      error
    );
    return null;
  }
};

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.email });
    const decryptedNotes = notes.map((note) => {
      const noteTitle = note.title ? decrypt(note.title) : "";
      const noteText = note.text ? decrypt(note.text) : "";

      return {
        _id: note._id,
        user: note.user,
        title: noteTitle, // Le texte est maintenant déchiffré
        text: noteText,
      };
    });
    // Si la requête est de type POST, alors renvoyer sous forme de JSON
    if (req.method == "POST") {
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ note: decryptedNotes }));
    } else {
      res.render("notes", { title: "Notes", notes: decryptedNotes });
    }
  } catch (err) {
    console.error(err);
  }
};

const getNote = async (req, res) => {
  const findOneQuery = { _id: new ObjectId(req.body.id) };

  try {
    const note = await Note.findOne(findOneQuery);
    const decryptedNote = {
      _id: note._id,
      user: note.user,
      title: note.title ? decrypt(note.title) : "",
      text: note.text ? decrypt(note.text) : "",
    };
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ note: decryptedNote }));
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
    const notes = await Note.find(findQuery);
    const decryptedNotes = notes.map((note) => {
      const noteTitle = note.title ? decrypt(note.title) : "";
      const noteText = note.text ? decrypt(note.text) : "";

      return {
        _id: note._id,
        user: note.user,
        title: noteTitle, // Le texte est maintenant déchiffré
        text: noteText,
      };
    });

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ note: decryptedNotes }));
  } catch (err) {
    console.error(err);
  }
};

const createNote = async (req, res) => {
  // Chiffrement
  req.body.title = encrypt(req.body.title);
  req.body.text = encrypt(req.body.text);

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
  // Chiffrement
  req.body.title = encrypt(req.body.title);
  req.body.text = encrypt(req.body.text);

  const note = { _id: new ObjectId(req.body.id) };
  const noteContent = { $set: { title: req.body.title, text: req.body.text } };

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
