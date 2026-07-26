const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateFlashcards(text) {
  try {

    const limitedText = text.substring(0, 12000);

    const prompt = `
You are an AI Study Assistant.

Generate exactly 10 flashcards from the following study material.

Rules:
- Return ONLY valid JSON.
- No markdown.
- No explanation.
- Keep answers short and simple.

Format:

[
  {
    "question":"What is Operating System?",
    "answer":"Operating System is system software that manages computer hardware and software."
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
          content: "You generate flashcards in valid JSON only.",
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

    console.log("FLASHCARD SERVICE ERROR:", error);

    throw new Error("Unable to generate flashcards.");

  }
}

module.exports = {
  generateFlashcards,
};