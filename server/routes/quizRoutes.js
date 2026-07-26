const express = require("express");
const router = express.Router();

const { generateQuizFromPDF } = require("../controllers/quizController");

router.post("/generate", generateQuizFromPDF);

module.exports = router;