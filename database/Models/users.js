const { Schema, model } = require("mongoose");

const QuizAttemptSchema = new Schema({
  attempts: {
    type: Number,
    required: true,
  },
  quizID: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema({
  attemptedQuiz: [QuizAttemptSchema],
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});

module.exports = model("user", userSchema);
