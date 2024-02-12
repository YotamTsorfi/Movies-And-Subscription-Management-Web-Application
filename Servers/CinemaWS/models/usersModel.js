// Require mongoose
const mongoose = require('mongoose'); // Require mongoose
mongoose.set('strictQuery', true); // Enable strict mode

// Create Schema
const UsersSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  { versionKey: false }
);

//Creating model objects
const UserModel = mongoose.model('users', UsersSchema);

// Exporting our model objects
module.exports = {
  UserModel
};

