const express = require("express");
const router = express.Router();

const {
  logIn,
  signUp,
  updateUser,
  deleteUser,
} = require("../controllers/users.js");

router.get("/signup", (req, res) => {
  res.render("users/signup", { h1: "Notes", h2: "Inscription" });
});

router.put("/signup", signUp);

router.put("/update", updateUser);

router.get("/login", (req, res) => {
  res.render("users/login", { h1: "Notes", h2: "Connexion" });
});

router.post("/login", logIn);

router.get("/logout", (req, res) => {
  res.clearCookie("authorization");
  res.redirect("/login");
});

router.delete("/:userID", deleteUser);

module.exports = router;
