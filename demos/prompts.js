import { OpenAI, LLMChain, PromptTemplate } from "langchain";

const model = new OpenAI({
  temperature: 0.9,
});

const template = "What is a good name for a {decade} {genre} band?";
const prompt = new PromptTemplate({
  template,
  inputVariables: ["decade", "genre"],
});

// testing
// const res = prompt.format({ decade: "80's", genre: "techno" });

const chain = new LLMChain({
  llm: model,
  prompt,
});

let res = await chain.call({ decade: "80's", genre: "techno" });
console.log(res);
