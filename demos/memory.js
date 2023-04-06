import { OpenAI } from "langchain";
import { ConversationChain } from "langchain/chains";
import { BufferMemory } from "langchain/memory";

const model = new OpenAI({});

const memory = new BufferMemory();
const chain = new ConversationChain({ llm: model, memory });

const res = await chain.call({ input: "Hi I am James" });
console.log(res);
const res2 = await chain.call({ input: "What is my name?" });
console.log(res2);
