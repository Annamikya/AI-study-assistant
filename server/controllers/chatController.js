const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");

const PDF = require("../models/PDF");
const Chat = require("../models/Chat");

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.askQuestion = async (req, res) => {
  try {
    const { pdfId, question } = req.body;

    if (!pdfId || !question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "PDF ID and question are required",
      });
    }

    const pdf = await PDF.findOne({
      _id: pdfId,
      uploadedBy: req.user.id,
    });

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: "PDF not found or you do not have access to it",
      });
    }

    const pdfPath = path.join(
      __dirname,
      "..",
      "uploads",
      path.basename(pdf.filename)
    );

    console.log("========== CHAT DEBUG ==========");
    console.log("PDF Path:", pdfPath);

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).json({
        success: false,
        message:
          "PDF file is missing from the server. Please upload the PDF again.",
      });
    }

    const buffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(buffer);

    if (!pdfData.text || !pdfData.text.trim()) {
      return res.status(400).json({
        success: false,
        message: "No readable text was found in this PDF",
      });
    }

    const limitedText = pdfData.text.substring(0, 12000);

    const prompt = `
You are an AI Study Assistant.

Answer only using the information present in the uploaded PDF.

If the answer is not available in the PDF, reply exactly:

"I couldn't find this information in the uploaded PDF."

PDF Content:
${limitedText}

Question:
${question.trim()}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You answer questions only from the uploaded PDF. Do not make up answers.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const answer =
      completion.choices?.[0]?.message?.content ||
      "Unable to generate an answer.";

    const chat = await Chat.create({
      pdfId,
      question: question.trim(),
      answer,
    });

    return res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error("CHAT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to process question",
      error: error.message,
    });
  }
};