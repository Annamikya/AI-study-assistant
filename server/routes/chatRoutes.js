const express = require("express");
const router = express.Router();

const { askQuestion } = require("../controllers/chatController");
const { generalChat } = require("../controllers/generalChatController");

// General AI Chat
router.post("/general", generalChat);

// Chat with Uploaded PDF
router.post("/ask", askQuestion);

module.exports = router;