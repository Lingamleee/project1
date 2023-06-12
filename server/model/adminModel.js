const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
  },
  type: {
    type: String,
    default: "Admin",
  },
});

module.exports = mongoose.model("Admin", adminSchema);
