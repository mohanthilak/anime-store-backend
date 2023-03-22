const express = require("express");
const router = express.Router();

const { FeedbackService } = require("../../services/feedback");
const { FeedbackRepository } = require("../../database/Repository/feedback");

const feedbackRepo = new FeedbackRepository();
const feedbackService = new FeedbackService(feedbackRepo);

router.post("/create", async (req, res) => {
  try {
    const { uid, feedback, category } = req.body;
    const data = await feedbackService.CreateFeedback({
      uid,
      feedback,
      category,
    });
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling create feedback", e);
    return res.status(401).json({ success: false, error: e });
  }
});

router.get("/all-feebacks", async (req, res) => {
  try {
    const data = await feedbackService.GetAllFeedbacks();
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling Get All feedbacks", e);
    return res.status(401).json({ success: false, error: e });
  }
});

router.get("/category-feebacks", async (req, res) => {
  try {
    const { category } = req.body;
    const data = await feedbackService.GetFeedbacksOnCategory({ category });
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling Get Category feedbacks", e);
    return res.status(401).json({ success: false, error: e });
  }
});
module.exports = router;
