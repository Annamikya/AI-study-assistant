const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  generateNotesFromPDF,
  getNotesByPDF,
} = require("../controllers/noteController");

router.post(
  "/generate",
  authMiddleware,
  generateNotesFromPDF
);

router.get(
  "/:pdfId",
  authMiddleware,
  getNotesByPDF
);

module.exports = router;