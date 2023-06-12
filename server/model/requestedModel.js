const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema(
  {
    sender: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User1",
      required: true,
    },
    accepted: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students",
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Requests", RequestSchema);
