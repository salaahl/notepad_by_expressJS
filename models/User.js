const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, "Adresse email invalide"],
  },
  password: { type: String, required: true },
  roles: { type: [String], required: true },
});

userSchema.virtual("fullname").get(function () {
  return `${this.name}, ${this.surname}`;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
