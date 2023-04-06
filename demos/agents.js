import { OpenAI } from "langchain";
// agents
import { initializeAgentExecutor } from "langchain/agents";
//tools
import { SerpAPI, Calculator } from "langchain/tools";

const model = new OpenAI({
  temperature: 0,
});
const tools = [new SerpAPI(), new Calculator()];

const executor = await initializeAgentExecutor(
  tools,
  model,
  "zero-shot-react-description"
);

// const input =
//   "What is the combined age of the 4 new astronauts about to circle the moon";

const input = "How many inches did it snow in salt lake city?";

const result = await executor.call({ input });

console.log(JSON.stringify(result));
console.log(result.output);
