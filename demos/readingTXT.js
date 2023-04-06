import { OpenAI } from "langchain";
import { initializeAgentExecutor } from "langchain/agents";
import { Calculator, ChainTool } from "langchain/tools";
import { VectorDBQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores";
import { OpenAIEmbeddings } from "langchain/embeddings";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

import * as fs from "fs";

const model = new OpenAI({ temperature: 0 });
/* Load in the file we want to do question answering over */
const text = fs.readFileSync(
  "/Users/jamesyeates/Desktop/FS/2301/week6/langchainDemo/demos/shrek.txt"
);
/* Split the text into chunks */
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSplitter.createDocuments([text]);
/* Create the vectorstore */
const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
/* Create the chain */
const chain = VectorDBQAChain.fromLLM(model, vectorStore);

const qaTool = new ChainTool({
  name: "shrek about",
  description:
    // "State of the Union QA - useful for when you need to ask questions about the most recent state of the union address.",
    "Ask any question about the shreck script.",
  chain: chain,
});

const tools = [new Calculator(), qaTool];

const executor = await initializeAgentExecutor(
  tools,
  model,
  "zero-shot-react-description"
);
console.log("Loaded agent.");

const input = `What is the main theme song in shreck?`;

console.log(`Executing with input "${input}"...`);

const result = await executor.call({ input });

console.log(`Got output ${result.output}`);
