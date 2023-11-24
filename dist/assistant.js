"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const openai_1 = __importDefault(require("openai"));
(0, dotenv_1.config)();
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY
});
// const assistant = await openai.beta.assistants.create({
//     name: "Math Tutor",
//     instructions: "You are a personal math tutor. Write and run code to answer math questions.",
//     tools: [{ type: "code_interpreter" }],
//     model: "gpt-3.5-turbo"
//   });
const thread = await openai.beta.threads.create();
const message = await openai.beta.threads.messages.create(thread.id, {
    role: "user",
    content: "I need to solve the equation `3x + 11 = 14`. Can you help me?"
});
//thread_qlJU7wRtLm3AeAoCWE8PcCEZ
const myAssistant = await openai.beta.assistants.retrieve("asst_5Yzx2kYiKHc0FH7UOzY1Btmt");
const run = await openai.beta.threads.runs.create('thread_qlJU7wRtLm3AeAoCWE8PcCEZ', {
    assistant_id: myAssistant.id
});
const messages = await openai.beta.threads.messages.list(thread.id);
console.log(messages);
