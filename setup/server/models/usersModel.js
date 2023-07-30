const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
  },
  biography: {
    type: String,
    trim: true,
  },
});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
