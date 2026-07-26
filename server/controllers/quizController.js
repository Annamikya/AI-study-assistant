const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mongoose = require("mongoose");

const PDF = require("../models/PDF");
const Quiz = require("../models/Quiz");
const { generateQuiz } = require("../services/quizService");

exports.generateQuizFromPDF = async (req, res) => {
  try {
    const { pdfId } = req.body;

    console.log("========== QUIZ DEBUG ==========");
    console.log("Received PDF ID:", pdfId);

    if (!pdfId) {
      return res.status(400).json({
        success: false,
        message: "PDF ID is required",
      });
    }

    // Check ObjectId validity
    if (!mongoose.Types.ObjectId.isValid(pdfId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid PDF ID",
      });
    }

    // Find PDF
    const pdf = await PDF.findById(pdfId);

    console.log("Found PDF:", pdf);

    if (!pdf) {
      const allPDFs = await PDF.find().select("_id title");

      console.log("Available PDFs:", allPDFs);

      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    const pdfPath = path.join(__dirname, "..", pdf.filepath);

    console.log("PDF Path:", pdfPath);

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({
        success: false,
        message: "PDF file not found",
      });
    }

    const buffer = fs.readFileSync(pdfPath);

    const pdfData = await pdfParse(buffer);

    if (!pdfData.text.trim()) {
      return res.status(400).json({
        success: false,
        message: "No text found inside PDF",
      });
    }

    const questions = await generateQuiz(pdfData.text);

    let quiz = await Quiz.findOne({ pdfId });

    if (quiz) {
      quiz.questions = questions;
      await quiz.save();
    } else {
      quiz = await Quiz.create({
        pdfId,
        questions,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quiz Generated Successfully",
      quiz,
    });

  } catch (error) {

    console.log("QUIZ ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Quiz Generation Failed",
      error: error.message,
    });

  }
};