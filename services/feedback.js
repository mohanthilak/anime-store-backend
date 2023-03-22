const ErrorMessage = "Error at Feedback Service layer";
class FeedbackService {
  feedbackRepo;

  constructor(repo) {
    this.feedbackRepo = repo;
  }

  async CreateFeedback({ uid, feedback, category }) {
    try {
      const data = await this.feedbackRepo.CreateFeedback({
        uid,
        feedback,
        category,
      });
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async GetAllFeedbacks() {
    try {
      const data = await this.feedbackRepo.GetAllFeedbacks();
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async GetFeedbacksOnCategory({ category }) {
    try {
      const data = await this.feedbackRepo.GetFeedbacksOnCategory({ category });
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }
  async GetFeedbacksCount() {
    try {
      const data = await this.feedbackRepo.GetFeedbackCount();
      return data;
    } catch (e) {
      console.log("Error while getting user count", e);
      return { success: false, error: e };
    }
  }
}

module.exports = { FeedbackService };
