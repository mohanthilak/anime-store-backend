const express = require("express");
const router = express.Router();
const { QuizRepository } = require("../../database/Repository/quiz");
const { UserRepository } = require("../../database/Repository/users");
const { QuizService } = require("../../services/quiz");

const quizRepo = new QuizRepository();
const userRepo = new UserRepository();
const quizService = new QuizService(quizRepo, userRepo);

router.post("/create", async (req, res) => {
  try {
    const { animeName, season, image, questions } = req.body;
    const data = await quizService.CreateQuiz({
      animeName,
      season,
      image,
      questions,
    });
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling CreateQuiz request:", e);
    return res.status(500).json({ success: false, message: "server-error" });
  }
});

router.get("/quiz/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await quizService.GetQuiz(id);
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling GetQuiz request:", e);
    return res.status(500).json({ success: false, message: "server-error" });
  }
});

router.get("/all-quiz", async (req, res) => {
  try {
    const data = await quizService.GetAllQuiz();
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling GetAllQuiz request:", e);
    return res.status(500).json({ success: false, message: "server-error" });
  }
});

router.post("/set-attempted", async (req, res) => {
  try {
    const { uid, quizID, score } = req.body;
    console.log(req.body);
    const data = await quizService.SetAttempted({ uid, quizID, score });
  } catch (e) {
    console.log("Error while handling GetAllQuiz request:", e);
    return res.status(500).json({ success: false, message: "server-error" });
  }
});

router.post("/edit", async (req, res) => {
  try {
    const { id, animeName, season, image } = req.body;
    const data = await quizService.EditAnimeQuiz({
      id,
      animeName,
      season,
      image,
    });
    if (data.succes) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling GetQuiz request:", e);
    return res.status(500).json({ success: false, message: "server-error" });
  }
});

module.exports = router;
