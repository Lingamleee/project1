const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  regno:{
    type: String,
    required: true,
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
  phone:{
    type: String,
  },
  Experience:{
    type: String,
  },
  position:{
    type: String,
    required: true,
  },
  availability:{ 
    type: Number,
    default: 2,
  },
  password: {
    type: String,
    default: "staff",
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  student:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
    }
  ],
  avatarImage: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "Staff",
  },
});

module.exports = mongoose.model("Staffs", userSchema);
