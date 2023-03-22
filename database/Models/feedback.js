const { Schema, model } = require("mongoose");

const feedbackSchema = new Schema({
  uid: {
    type: String,
    requied: true,
  },
  category: {
    type: String,
    required: true,
    // enum: [""]
  },
  feedback: {
    type: String,
    required: true,
  },
});

module.exports = model("feedback", feedbackSchema);
