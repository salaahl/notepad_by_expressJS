const mongoose = require('mongoose');
const { INTEGER } = require('sqlite3/lib/sqlite3.pure');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  id: { type: Number, required: true, maxLength: 100 },
  title: { type: String, required: true, maxLength: 100 },
  text: { type: String, required: true, maxLength: 100 },
  tags: { type: String, required: false, maxLength: 100 },
  user_id: { type: Number, required: false, maxLength: 100 },
});

// Virtual for note's full name
NoteSchema.virtual('name').get(function () {
  // To avoid errors in cases where an note does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = '';
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }

  return fullname;
});

// Virtual for note's URL
NoteSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/note/${this._id}`;
});

// Export model
module.exports = mongoose.model('Note', NoteSchema);
