const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  role: String,
});

const User = mongoose.model("user", userSchema);
exports.User = User;
