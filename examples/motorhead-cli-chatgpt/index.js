import readline from "readline";
import chalk from "chalk";
import { CallbackManager } from "langchain/callbacks";
import { ConversationChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { MotorheadMemory } from "langchain/memory";
import * as dotenv from "dotenv";

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const chat = new ChatOpenAI({
  temperature: 0,
  streaming: true,
  callbackManager: CallbackManager.fromHandlers({
    async handleLLMNewToken(token) {
      process.stdout.write(chalk.green(token));
    },
  }),
});

const memory = new MotorheadMemory({
  returnMessages: true,
  memoryKey: "history",
  sessionId: process.env.SESSION_ID,
  motorheadURL: process.env.MOTORHEAD_URL,
});

await memory.init(); // loads previous state from Motorhead 🤘

let context = "";

if (memory.context) {
  context = `Here's previous context: ${memory.context}`;
}

const systemPrompt = `You are a helpful assistant.${context}`;

const chatPrompt = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(systemPrompt),
  new MessagesPlaceholder("history"),
  HumanMessagePromptTemplate.fromTemplate("{input}"),
]);

const chain = new ConversationChain({
  memory,
  prompt: chatPrompt,
  llm: chat,
});

const postToShell = async () => {
  rl.question(chalk.green(`\n`), async function(answer) {
    const res = await chain.call({ input: answer });
    await postToShell(res.response);
  });
};

rl.question(chalk.blue(`\nMotorhead 🤘chat start\n`), async function(answer) {
  const res = await chain.call({ input: answer });
  await postToShell(res.response);
});
