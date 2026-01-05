const MAX_ATTEMPTS = 3;
const LOCK_TIME = 30 * 60 * 1000; // 30 minutes

const User = require("../models/User.js");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const logIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const invalidMsg = "Identifiants incorrects";

    if (!user) {
      return res.status(401).json({ error: invalidMsg });
    }

    // Vérification du verrouillage
    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(423).json({
        error: "Compte temporairement bloqué. Veuillez réessayer plus tard.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      user.failedLogins += 1;

      if (user.failedLogins >= MAX_ATTEMPTS) {
        user.lockUntil = new Date(Date.now() + LOCK_TIME);
        user.failedLogins = 0;
      }

      await user.save();
      return res.status(401).json({ error: invalidMsg });
    }

    // Connexion réussie
    const token = jwt.sign({ email: user.email }, process.env.SECRET, {
      expiresIn: "10m",
    });

    res.cookie("authorization", token, {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    user.failedLogins = 0;
    user.lockUntil = null;
    await user.save();

    return res.json({ redirect: "/" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur interne" });
  }
};

const signUp = async (req, res) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ error: "Le mot de passe est requis" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hashedPassword,
      roles: ["user"],
    });

    await user.save();
    return res.json({ redirect: "/login" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Impossible de créer ce compte." });
    }

    if (err.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: Object.values(err.errors)[0].message });
    }

    console.error(err);
    return res.status(500).json({ error: "Erreur interne" });
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

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ status: "User deleted" }));
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
