const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const PDF = require("../models/PDF");
const Summary = require("../models/Summary");
const { generateSummary } = require("../services/geminiService");

exports.generatePDFSummary = async (req, res) => {
  try {
    const { pdfId } = req.body;

    if (!pdfId) {
      return res.status(400).json({
        success: false,
        message: "PDF ID is required",
      });
    }

    // Find PDF
    const pdf = await PDF.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found",
      });
    }

    // Build Absolute PDF Path
    const pdfPath = path.join(__dirname, "..", pdf.filepath);

    console.log("========== SUMMARY DEBUG ==========");
    console.log("PDF Path:", pdfPath);

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({
        success: false,
        message: "PDF file not found on server",
      });
    }

    // File Info
    const stat = fs.statSync(pdfPath);

    console.log("File Size:", stat.size);

    // Read PDF
    const dataBuffer = fs.readFileSync(pdfPath);

    console.log("Buffer Size:", dataBuffer.length);

    // Extract Text
    const pdfData = await pdfParse(dataBuffer);

    console.log("PDF Parsed Successfully");
    console.log("Extracted Characters:", pdfData.text.length);

    if (!pdfData.text || pdfData.text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "No text found inside PDF",
      });
    }

    // Generate AI Summary
    const summaryText = await generateSummary(pdfData.text);

    // Save Summary
    let summary = await Summary.findOne({ pdfId });

    if (summary) {
      summary.summary = summaryText;
      await summary.save();
    } else {
      summary = await Summary.create({
        pdfId,
        summary: summaryText,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Summary Generated Successfully",
      summary,
    });

  } catch (error) {

    console.error("SUMMARY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Summary Generation Failed",
      error: error.message,
    });

  }
};