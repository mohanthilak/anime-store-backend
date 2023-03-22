const feedbackModel = require("../Models/feedback");
const ErrorMessage = "Error at Feedback Repository layer";

class FeedbackRepository {
  async CreateFeedback({ uid, category, feedback }) {
    try {
      const feedbackObj = new feedbackModel({ uid, category, feedback });
      await feedbackObj.save();
      return { success: true, feedback: feedbackObj };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async GetAllFeedbacks() {
    try {
      const feedbacks = await feedbackModel.find({}).lean();
      return { success: true, data: feedbacks };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async GetFeedbackOnCategory({ category }) {
    try {
      const feedbacks = await feedbackModel.find({ category });
      return { success: true, data: feedbacks };
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async GetFeedbackCount() {
    try {
      const count = await feedbackModel.count();
      return { success: true, count };
    } catch (e) {
      console.log("Error while getting total feedbacks count", e);
      return { success: false, error: e };
    }
  }
}

module.exports = { FeedbackRepository };
