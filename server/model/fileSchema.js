const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Uploaded file must have a name"],
  },
  student: {
    type: String,
    required: [true, "Uploaded file must belong to a student"],
  },
});

const File = mongoose.model('File1', fileSchema);

// Exporting the Model to use it in app.js File.
module.exports = File;