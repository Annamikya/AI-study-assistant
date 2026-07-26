const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateNotes(text) {
  try {
    const limitedText = text.substring(0, 12000);

    const prompt = `
You are an AI Study Assistant.

Generate concise study notes from the following study material.

Rules:
- Return ONLY valid JSON.
- No markdown.
- No explanation.
- Create 5 to 8 headings.
- Under each heading write 3 to 5 bullet points.
- Keep every point short and easy to understand.

Format:

{
  "title": "Study Notes",
  "notes": [
    {
      "heading": "Heading",
      "points": [
        "Point 1",
        "Point 2",
        "Point 3"
      ]
    }
  ]
}

Study Material:

${limitedText}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You generate study notes in valid JSON only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
    });

    const response = completion.choices[0].message.content;

    return JSON.parse(response);

  } catch (error) {
    console.log("NOTE SERVICE ERROR:", error);
    throw new Error("Unable to generate notes.");
  }
}

module.exports = {
  generateNotes,
};