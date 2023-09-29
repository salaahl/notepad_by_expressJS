const User = require('../models/User.js');
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const logIn = async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      if (result) {
        // sign token and send it in response
        // possibilité de lui donner un temps d'expiration, voir le "expiresIn"
        const token = await jwt.sign({ email: user.email }, process.env.SECRET);

        // 600*1000 pour 10 min
        res.cookie('authorization', token, {
          maxAge: 600 * 1000,
          httpOnly: true,
        });

        res.redirect('/');
      } else {
        res.status(400).json({ error: 'Le mot de passe est incorrect' });
      }
    } else {
      res.status(400).json({ error: "L'utilisateur n'existe pas" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const signUp = async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
    roles: ['user'],
  });

  try {
    await user.save();
    res.redirect('/login');
  } catch (err) {
    if (err.code === 11000) {
      res.setHeader('Content-Type', 'application/json');
      return res
        .status(400)
        .send({ error: 'Un compte avec cette adresse mail existe déjà.' });
    }

    // Error handling for misc validation errors
    if (err.name === 'ValidationError') {
      res.status(400);
      return res.send(Object.values(err.errors)[0].message);
    }
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
  logIn,
  signUp,
  updateUser,
  deleteUser,
};
