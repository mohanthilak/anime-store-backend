const express = require("express");
const router = express.Router();
const { ChatService } = require("../../services/chat");
const chatService = new ChatService();

router.post("/get-chat", async (req, res) => {
  try {
    const { users } = req.body;
    console.log(req.body);
    const data = await chatService.GetChat({ users });
    if (data.success) return res.status(200).json(data);
    return res.status(201).json(data);
  } catch (e) {
    console.log("Error while handling get chat", e);
    return res.status(401).json({ success: false, error: e });
  }
});

module.exports = router;
