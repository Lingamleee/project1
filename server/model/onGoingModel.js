const mongoose = require("mongoose");

const OnGoingSchema = mongoose.Schema(
  {
    progress : { type: Number, required: true },
    id : {
      type: Number,
      default: 1
    }
  }
);

module.exports = mongoose.model("OnGoing", OnGoingSchema);
