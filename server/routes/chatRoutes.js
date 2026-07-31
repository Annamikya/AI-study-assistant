const express = require("express");
const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  askQuestion,
} = require("../controllers/chatController");

const {
  generalChat,
} = require("../controllers/generalChatController");

// General AI Chat
router.post("/general", generalChat);

// Chat with uploaded PDF
router.post(
  "/ask",
  authMiddleware,
  askQuestion
);

module.exports = router;