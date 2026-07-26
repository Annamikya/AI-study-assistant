const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const {
  uploadPDF,
  getPDFs,
  deletePDF,
  openPDF,
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
  getPDFs
);

// Delete logged-in user's PDF
router.delete(
  "/:id",
  authMiddleware,
  deletePDF
);

// Open logged-in user's PDF
router.get(
  "/:id",
  authMiddleware,
  openPDF
);

module.exports = router;