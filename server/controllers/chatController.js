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

    if (!pdfId || !question) {
      return res.status(400).json({
        success: false,
        message: "PDF ID and Question are required",
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

    // Read PDF
    const pdfPath = path.join(__dirname, "..", pdf.filepath);

    const buffer = fs.readFileSync(pdfPath);

    // Extract Text
    const pdfData = await pdfParse(buffer);

    // Limit text to avoid sending huge PDFs
    const limitedText = pdfData.text.substring(0, 12000);

    const prompt = `
You are an AI Study Assistant.

Answer ONLY using the information present in the PDF.

If the answer is not available in the PDF, reply exactly:

"I couldn't find this information in the uploaded PDF."

PDF Content:
${limitedText}

Question:
${question}
`;

    // Groq API
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You answer questions ONLY from the uploaded PDF. Never make up answers.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const answer = completion.choices[0].message.content;

    // Save Chat
    const chat = await Chat.create({
      pdfId,
      question,
      answer,
    });

    res.status(200).json({
      success: true,
      chat,
    });

  } catch (error) {
    console.error("CHAT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to process question",
      error: error.message,
    });
  }
};