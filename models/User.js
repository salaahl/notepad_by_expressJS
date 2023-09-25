const mongoose = require('mongoose');

/*
A faire :
- Validateur sur le email (validate: [isEmail, 'invalid email'] + l'import)
*/
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  roles: { type: [String], required: true },
});

userSchema.virtual('fullname').get(function () {
  return `${this.name}, ${this.surname}`;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
