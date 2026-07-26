const express = require("express");

const router = express.Router();

const {
  generateFlashcards,
  getFlashcards,
} = require("../controllers/flashcardController");


// Generate Flashcards
router.post("/generate", generateFlashcards);


// Get Flashcards by PDF ID
router.get("/:pdfId", getFlashcards);


module.exports = router;