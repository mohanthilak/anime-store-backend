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
}

module.exports = { QuizRepository };
