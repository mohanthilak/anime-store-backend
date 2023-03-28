const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
  messageText: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});

const ChatRoomSchema = new Schema({
  users: [{ type: String, required: true }],
  messages: [MessageSchema],
  roomType: {
    type: String,
    default: "simple",
  },
  display: {
    type: String,
    default: true,
  },
});

module.exports = model("chatroom", ChatRoomSchema);
