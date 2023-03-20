import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { question, description } = req.body;
  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    prompt: generatePrompt(question, description),
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(question, description) {
  return `I'm interviewing for a new job and am preparing for potential questions. The question I'm preparing for is: ${question}. Please provide an answer to the question using an example from my professional experience. Your reply should only contain the answer to the question and nothing else. The information following this sentence is my professional experience. ${description} `;
}
