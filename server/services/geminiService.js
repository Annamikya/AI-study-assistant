const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateSummary(text) {
  try {
    const limitedText = text.substring(0, 12000);

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are an AI Study Assistant. Summarize study material in simple English using bullet points.",
        },
        {
          role: "user",
          content: limitedText,
        },
      ],
      temperature: 0.3,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq Error:", error);
    throw new Error("Unable to generate summary.");
  }
}

module.exports = { generateSummary };