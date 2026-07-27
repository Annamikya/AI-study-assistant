const express = require("express");
const router = express.Router();

const upload = require("../config/multer");
const authMiddleware = require("../middleware/authMiddleware");

const {
  uploadPDF,
  getUserPDFs,
  getPDFById,
  deletePDF,
} = require("../controllers/pdfController");

// Upload PDF
router.post(
  "/upload",
  authMiddleware,
  upload.single("pdf"),
  uploadPDF
);

// Get logged-in user's PDFs
router.get(
  "/",
  authMiddleware,
  getUserPDFs
);

// Open logged-in user's PDF
router.get(
  "/:id",
  authMiddleware,
  getPDFById
);

// Delete logged-in user's PDF
router.delete(
  "/:id",
  authMiddleware,
  deletePDF
);

module.exports = router;