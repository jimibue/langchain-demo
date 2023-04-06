import { OpenAI } from "langchain";

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});

const res = await model.call("What is a good name for a techno band?");

console.log(res);
