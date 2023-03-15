const ErrorMessage = "Error in Quiz service layer";

class QuizService {
  QuizRepo;
  UserRepo;
  constructor(quizrepo, userRepo) {
    this.QuizRepo = quizrepo;
    this.UserRepo = userRepo;
  }

  async CreateQuiz(quizObj) {
    try {
      const data = await this.QuizRepo.CreateQuiz(quizObj);
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async GetQuiz(quizID) {
    try {
      const data = await this.QuizRepo.GetQuiz(quizID);
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async GetAllQuiz() {
    try {
      const data = await this.QuizRepo.GetAllQuiz();
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async EditAnimeQuiz(quizObj) {
    try {
      const data = await this.QuizRepo.EditAnimeDetails(quizObj);
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async SetAttempted({ uid, quizID, score }) {
    try {
      const UData = await this.UserRepo.UpdateAttemptedQuiz({
        uid,
        quizID,
        score,
      });
      const qData = await this.QuizRepo.UpdateQuizAttemptCount({ quizID });
      console.log(UData, qData);
      return { UData, qData };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async GetQuizCount() {
    try {
      const data = await this.QuizRepo.GetQuizCount();
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }
}

module.exports = { QuizService };
