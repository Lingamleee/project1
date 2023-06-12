const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  regno:{
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    min: 3,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    max: 50,
  },
  password: {
    type: String,
    default: "student",
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  message:{
    type: Object,
    default: {},
  },
  title:{
    type: String,
    default: "",
  },
  guide:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Guides",
    default: null,
  },
  avatarImage: {
    type: String,
    default: "",
  },type: {
    type: String,
    default: "Student",
  },
});

module.exports = mongoose.model("Students", userSchema);
