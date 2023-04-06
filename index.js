import { OpenAI } from "langchain";

const model = new OpenAI({
  temperature: 0.9,
});

const res = await model.call("What is a good name for a techno band?");

console.log(res);
