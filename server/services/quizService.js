const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateQuiz(text) {
  try {
    // Token limit bachane ke liye
    const limitedText = text.substring(0, 12000);

    const prompt = `
You are an AI Study Assistant.

Generate exactly 5 multiple choice questions from the following study material.

Rules:
- Each question must have 4 options.
- Mention the correct answer.
- Return ONLY valid JSON.
- No markdown.
- No explanation.

Format:

[
  {
    "question":"...",
    "options":["A","B","C","D"],
    "answer":"..."
  }
]

Study Material:

${limitedText}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You generate quizzes in valid JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    });

    const response = completion.choices[0].message.content;

    return JSON.parse(response);

  } catch (error) {

    console.log("QUIZ SERVICE ERROR:", error);

    throw new Error("Unable to generate quiz.");
  }
}

module.exports = {
  generateQuiz,
};