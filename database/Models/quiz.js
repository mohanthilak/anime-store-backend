const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  optionA: {
    type: String,
    required: true,
  },
  optionB: {
    type: String,
    required: true,
  },
  optionC: {
    type: String,
    required: true,
  },
  optionD: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const quizSchema = new Schema({
  AttemptCount: {
    type: Number,
    required: true,
    default: 0,
  },
  animeName: {
    type: String,
    required: true,
  },
  season: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  questions: [QuestionSchema],
});

module.exports = model("quiz", quizSchema);
