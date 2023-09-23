const User = require('../models/User.js');
const ObjectId = require('mongodb').ObjectId;

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    // Si la requête est de type POST, alors renvoyer sous forme de JSON
    if (req.method == 'POST') {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ user: users }));
    } else {
      res.render('users', { users: users });
    }
  } catch (err) {
    console.error(err);
  }
};

const getUser = async (req, res) => {
  const findOneQuery = { _id: new ObjectId(req.body.id) };

  try {
    const user = await User.findOne(findOneQuery);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ user: user }));
  } catch (err) {
    console.error(`Something went wrong trying to find one user: ${err}\n`);
  }
};

const searchUser = async (req, res) => {
  const search = req.body.search;
  // Le "i" de $options est pour "insensitive case"
  const findQuery = {
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { text: { $regex: search, $options: 'i' } },
    ],
  };

  try {
    const users = await User.find(findQuery);

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ user: users }));
  } catch (err) {
    console.error(err);
  }
};

const createUser = async (req, res) => {
  const user = new User({
    name: 'Salaha',
    surname: 'Sokhona',
    email: 'sokhona.salaha@gmail.com',
    password: 'Sokhona',
    roles: ['user'],
  });

  try {
    await user.save();
    console.log('Utilisateur ajouté !');
  } catch (err) {
    console.error(err);
  }
};

const updateUser = async (req, res) => {
  const user = { _id: new ObjectId(req.body.id) };
  const userContent = { $set: { title: req.body.title, text: req.body.text } };

  // The following options document specifies that we want the *updated*
  // document to be returned. By default, we get the document as it was *before*
  // the update.
  const options = { returnOriginal: false };

  try {
    const updateResult = await User.findOneAndUpdate(
      user,
      userContent,
      options
    );
  } catch (err) {
    console.error(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteResult = await User.deleteOne({
      _id: new ObjectId(req.body.id),
    });

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'User deleted' }));
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  searchUser,
  updateUser,
  deleteUser,
};
