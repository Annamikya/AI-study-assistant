const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mongoose = require("mongoose");

const PDF = require("../models/PDF");
const Flashcard = require("../models/Flashcard");
const { generateFlashcards } = require("../services/flashcardService");


// ===============================
// Generate Flashcards
// ===============================

exports.generateFlashcards = async (req, res) => {

  try {

    const { pdfId } = req.body;

    console.log("========== FLASHCARD DEBUG ==========");
    console.log("Received PDF ID:", pdfId);

    if (!pdfId) {
      return res.status(400).json({
        success: false,
        message: "PDF ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(pdfId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid PDF ID",
      });
    }

    const pdf = await PDF.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    const pdfPath = path.join(__dirname, "..", pdf.filepath);

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

    const cards = await generateFlashcards(pdfData.text);

    let flashcards = await Flashcard.findOne({ pdfId });

    if (flashcards) {

      flashcards.cards = cards;

      await flashcards.save();

    } else {

      flashcards = await Flashcard.create({

        pdfId,

        cards,

      });

    }

    return res.status(200).json({

      success: true,

      message: "Flashcards Generated Successfully",

      flashcards,

    });

  }

  catch (error) {

    console.log("FLASHCARD ERROR:", error);

    return res.status(500).json({

      success: false,

      message: "Flashcard Generation Failed",

      error: error.message,

    });

  }

};



// ===============================
// Get Flashcards
// ===============================

exports.getFlashcards = async (req, res) => {

  try {

    const { pdfId } = req.params;

    const flashcards = await Flashcard.findOne({ pdfId });

    if (!flashcards) {

      return res.status(404).json({

        success: false,

        message: "No Flashcards Found",

      });

    }

    return res.status(200).json({

      success: true,

      flashcards,

    });

  }

  catch (error) {

    console.log(error);

    return res.status(500).json({

      success: false,

      message: "Unable to Fetch Flashcards",

    });

  }

};