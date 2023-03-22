const express = require("express");
const router = express.Router();
const { UserService } = require("../../services/users");
const { QuizService } = require("../../services/quiz");
const { ProductService } = require("../../services/product");
const { FeedbackService } = require("../../services/feedback");

const { UserRepository } = require("../../database/Repository/users");
const { ProductRepository } = require("../../database/Repository/product");
const { QuizRepository } = require("../../database/Repository/quiz");
const { FeedbackRepository } = require("../../database/Repository/feedback");

const userRepo = new UserRepository();
const quizRepo = new QuizRepository();
const productRepo = new ProductRepository();
const feedbackRepo = new FeedbackRepository();

const quizService = new QuizService(quizRepo, userRepo);
const productService = new ProductService(productRepo);
const userservice = new UserService(userRepo);
const feedbackService = new FeedbackService(feedbackRepo);
const { auth } = require("../middlewares/auth");

router.post("/signup", async (req, res) => {
  try {
    const { email, password, username = "defalut" } = req.body;
    const data = await userservice.SignUp({ email, password, username });
    console.log("DATA:", data);
    if (data.success) {
      res.cookie("rt", data.tokens.refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).json(data);
    }
    return res.status(200).json(data);
  } catch (e) {
    console.log("Error while handling signup request:", e);
    return res.status(500).json({ success: false, message: "server-error" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { authText, password } = req.body;
    console.log(req.body);
    const data = await userservice.SignIn({ authText, password });
    if (data.success) {
      res.cookie("rt", data.refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      delete data.refreshToken;
      delete data.user.password;
      return res.status(200).json(data);
    }
    return res.status(200).json(data);
  } catch (e) {
    console.log("Error while handlinng signin request", e);
    return res
      .status(500)
      .json({ success: false, message: "server-error", error: e });
  }
});

//To get a users refresh-token from DB
router.get("/refresh-token/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const data = await userservice.GetRefreshToken(uid);
    if (data.success) return res.status(200).json(data);
    return res.status(404).json(data);
  } catch (e) {
    console.log("Error while handling get refresh-token request", e);
    return res.status(500).json({ success: false, message: e });
  }
});

router.post("/logout/:uid", async (req, res) => {
  try {
    // const { refreshToken, accessToken } = req.body;
    const cookies = req.cookies;
    if (!cookies?.rt) return res.sendStatus(403);
    const refreshToken = cookies.rt;
    const { uid } = req.params;
    const data = await userservice.HandleUserLogout(uid, refreshToken);
    res.clearCookie("rt");
    return res.status(200).json(data);
  } catch (e) {
    console.log("Error while handling logout request", e);
    return res.status(500).json({ success: false, message: e });
  }
});

//Sends a new access token after validating the refresh token
router.post("/refresh", async (req, res) => {
  try {
    // const {refreshToken} = req.body;
    const cookies = req.cookies;
    console.log("reached", cookies);
    if (!cookies?.rt) return res.sendStatus(403);
    const refreshToken = cookies.rt;
    const data = await userservice.RefreshAccessToken(refreshToken);
    // console.log("\n\n\n", data, "\n\n\n")
    return res.status(200).json(data);
  } catch (e) {
    console.log("Error while handling refresh access token handler", e);
    return res.status(202).json({ message: "error", e });
  }
});

router.get("/clear-cookies", async (req, res) => {
  res.clearCookie("rt");
  res.status(200).json({ message: "good" });
});

router.get("/protected", auth, async (req, res) => {
  res.status(200).json({ message: "secret message" });
});

router.get("/get-count-stats", async (req, res) => {
  try {
    const qData = await quizService.GetQuizCount();
    const pData = await productService.GetProductsCount();
    const uData = await userservice.GetUsersCount();
    const fData = await feedbackService.GetFeedbacksCount();

    const response = {
      success: true,
    };
    if (qData.success) response.q = qData.count;
    if (pData.success) response.p = pData.count;
    if (uData.success) response.u = uData.count;
    if (fData.success) response.f = fData.count;
    return res.status(200).json(response);
  } catch (e) {
    console.log("Error while handling count stats", e);
    return res.status(401).json({ success: false, error: e });
  }
});

router.get("/quiz-performance", async (req, res) => {
  try {
    const data = await userservice.GetAllUsersPerformace();
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling quiz-performance stats", e);
    return res.status(401).json({ success: false, error: e });
  }
});

router.get("/all-users", async (req, res) => {
  try {
    const data = await userservice.GetAllUsers();
    if (data) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    const data = await userservice.GetAllUsers();
    if (data) return res.status(200).json(data);
    return res.status(201).json(data);
  }
});
module.exports = router;
