const quizModel = require("../Models/quiz");
const ErrorStatement = "Error at Quiz Repository Layer:";

class QuizRepository {
  async CreateQuiz({ animeName, season, image, questions }) {
    try {
      await quizModel.create({ animeName, season, image, questions });
      return { success: true, message: "quiz added" };
    } catch (e) {
      console.log(ErrorStatement, e);
      return { success: false, error: e };
    }
  }

  async GetQuiz(id) {
    try {
      const quiz = await quizModel.findById(id).lean();
      if (quiz) return { success: true, quiz, message: "quiz fonud" };
      return { success: false, message: "Invalid-ID" };
    } catch (e) {
      console.log(ErrorStatement, e);
      return { success: false, error: e };
    }
  }

  async GetAllQuiz() {
    try {
      const quiz = await quizModel.find({}).lean();
      return { success: true, quiz };
    } catch (e) {
      console.log(ErrorStatement, e);
      return { success: false, error: e };
    }
  }
  async EditAnimeDetails({ id, animeName, season, image }) {
    try {
      const quiz = await quizModel.findOneAndUpdate(
        { _id: id },
        { animeName, season, image }
      );
      console.log(quiz);
      return { success: true, message: "Success Updated" };
    } catch (e) {
      console.log(ErrorStatement, e);
      return { success: false, error: e };
    }
  }

  async UpdateQuizAttemptCount({ quizID }) {
    try {
      const quiz = await quizModel
        .findOne({ _id: quizID })
        .select({ password: 0 });
      quiz.AttemptCount += 1;
      await quiz.save();
      return { success: true, quiz };
    } catch (e) {
      console.log(ErrorStatement, e);
      return { success: false, message: e };
    }
  }

  async GetQuizCount() {
    try {
      const count = await quizModel.count();
      return { success: true, count };
    } catch (e) {
      console.log(ErrorStatement, e);
      return { success: false, error: e };
    }
  }
}

module.exports = { QuizRepository };
