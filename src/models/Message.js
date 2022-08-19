const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  firstUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  secondUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  messageData: [
    {
      message: String,
      senderId: String,
      timestamp: { currentTime: () => Math.floor(Date.now() / 1000) },
    },
  ],
});

module.exports = mongoose.model("Message", MessageSchema);
