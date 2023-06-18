const mongoose = require("mongoose");

const RequestSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    message:{
        type: Object,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ppt", RequestSchema);
