const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    unique: false,
    required: true,
    maxlength: 100,
  },
  lastName: {
    type: String,
    unique: false,
    required: true,
    maxlength: 100,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please Provide a valid email",
    ],
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
