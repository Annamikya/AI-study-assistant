const path = require("path");
const fs = require("fs");
const PDF = require("../models/PDF");

const uploadPDF = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please select a PDF file",
      });
    }

    const pdf = await PDF.create({
      title: req.body.title || req.file.originalname,
      filename: req.file.filename,

      // Portable path for Windows and Linux
      filepath: `uploads/${req.file.filename}`,

      uploadedBy: req.user.id,
    });

    return res.status(201).json({
      message: "PDF uploaded successfully",
      pdf,
    });
  } catch (error) {
    console.error("PDF upload error:", error);

    if (req.file && req.file.path) {
      try {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      } catch (deleteError) {
        console.error(
          "Failed to remove uploaded file:",
          deleteError.message
        );
      }
    }

    return res.status(500).json({
      message: "PDF upload failed",
      error: error.message,
    });
  }
};

const getUserPDFs = async (req, res) => {
  try {
    const pdfs = await PDF.find({
      uploadedBy: req.user.id,
    }).populate("uploadedBy", "name email")
    .sort({
      createdAt: -1,
    });

    return res.status(200).json({
      pdfs,
    });
  } catch (error) {
    console.error("Get PDFs error:", error);

    return res.status(500).json({
      message: "Failed to fetch PDFs",
      error: error.message,
    });
  }
};

const getPDFById = async (req, res) => {
  try {
    const pdf = await PDF.findOne({
      _id: req.params.id,
      uploadedBy: req.user.id,
    });

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      path.basename(pdf.filename)
    );

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message:
          "PDF file is missing from the server. Please upload it again.",
      });
    }

    return res.sendFile(filePath);
  } catch (error) {
    console.error("Get PDF error:", error);

    return res.status(500).json({
      message: "Failed to open PDF",
      error: error.message,
    });
  }
};

const deletePDF = async (req, res) => {
  try {
    const pdf = await PDF.findOne({
      _id: req.params.id,
      uploadedBy: req.user.id,
    });

    if (!pdf) {
      return res.status(404).json({
        message: "PDF not found",
      });
    }

    const filePath = path.join(
      __dirname,
      "..",
      "uploads",
      path.basename(pdf.filename)
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await pdf.deleteOne();

    return res.status(200).json({
      message: "PDF deleted successfully",
    });
  } catch (error) {
    console.error("Delete PDF error:", error);

    return res.status(500).json({
      message: "Failed to delete PDF",
      error: error.message,
    });
  }
};

module.exports = {
  uploadPDF,
  getUserPDFs,
  getPDFById,
  deletePDF,
};