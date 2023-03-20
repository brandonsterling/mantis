import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { description } = req.body;
  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt: generatePrompt(description),
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(description) {
  return `I'm interviewwing for a new job and am preparing summaries of my professional experiences to answer potential questions. Please provide a summary using my professional experience that I could use in an interview. The information following this sentence is my professional experience. ${description} `;
}
