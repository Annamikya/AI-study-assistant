const PDF = require("../models/PDF");
const fs = require("fs");
const path = require("path");

// Upload PDF
exports.uploadPDF = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);
    console.log("Logged-in user:", req.user);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF file uploaded",
      });
    }

    if (!req.body.title) {
      return res.status(400).json({
        success: false,
        message: "PDF title is required",
      });
    }

    const pdf = await PDF.create({
      title: req.body.title,
      filename: req.file.filename,
      filepath: req.file.path,

      // User ID frontend se nahi lenge
      // Logged-in user ke token se lenge
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "PDF Uploaded Successfully",
      pdf,
    });
  } catch (error) {
    console.error("Upload Error:", error);

    res.status(500).json({
      success: false,
      message: "Upload Failed",
      error: error.message,
    });
  }
};

// Get only logged-in user's PDFs
exports.getPDFs = async (req, res) => {
  try {
    const pdfs = await PDF.find({
      uploadedBy: req.user.id,
    })
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pdfs.length,
      pdfs,
    });
  } catch (error) {
    console.error("Fetch PDFs Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to Fetch PDFs",
      error: error.message,
    });
  }
};

// Delete only logged-in user's PDF
exports.deletePDF = async (req, res) => {
  try {
    const pdf = await PDF.findOne({
      _id: req.params.id,
      uploadedBy: req.user.id,
    });

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found or you are not allowed to delete it",
      });
    }

    const filePath = path.resolve(pdf.filepath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await PDF.findByIdAndDelete(pdf._id);

    res.status(200).json({
      success: true,
      message: "PDF Deleted Successfully",
    });
  } catch (error) {
    console.error("Delete PDF Error:", error);

    res.status(500).json({
      success: false,
      message: "Delete Failed",
      error: error.message,
    });
  }
};

// Open only logged-in user's PDF
exports.openPDF = async (req, res) => {
  try {
    const pdf = await PDF.findOne({
      _id: req.params.id,
      uploadedBy: req.user.id,
    });

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found or you are not allowed to open it",
      });
    }

    const filePath = path.resolve(pdf.filepath);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "PDF file not found on server",
      });
    }

    res.sendFile(filePath);
  } catch (error) {
    console.error("Open PDF Error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to open PDF",
      error: error.message,
    });
  }
};