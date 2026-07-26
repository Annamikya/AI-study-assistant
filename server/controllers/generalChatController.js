const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

exports.generalChat = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI Study Assistant. Answer clearly in simple English.",
        },
        {
          role: "user",
          content: question,
        },
      ],
      temperature: 0.3,
    });

    return res.status(200).json({
      success: true,
      answer: completion.choices[0].message.content,
    });

  } catch (error) {

    console.log("GENERAL CHAT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to get AI response.",
      error: error.message,
    });
  }
};