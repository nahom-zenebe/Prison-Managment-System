const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // To enforce unique usernames
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admin", userSchema);
