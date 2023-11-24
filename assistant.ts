// import { config } from 'dotenv';
// import OpenAI from 'openai';

import OpenAI from "openai";
import { Thread } from "openai/resources/beta/threads/threads";
import { Message, MessageResponse } from "./models/message";
import { Run } from "openai/resources/beta/threads/runs/runs";
import { config } from "dotenv";
import { MessageContentText } from "openai/resources/beta/threads/messages/messages";

config();


export class OpenAIWrapper {


  private openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY 
    });
  }

  public async sendMessage(message: Message): Promise<any> {
    
    return new Promise(async (resolve, reject)=>{
      let thread: Thread;

      let messageResponse: MessageResponse = new MessageResponse();
      
      /** Create or retrieve thread for the new message */
      if(!message.threadId) {
        thread = await this.openAI.beta.threads.create();
      }
      else {
        thread = await this.openAI.beta.threads.retrieve(
          message.threadId
        );
      }

      messageResponse.threadId = thread.id;

      /** Create Message and append it to the thread */
      const openAIMessage = await this.openAI.beta.threads.messages.create(
        thread.id,
        {
          role: "user",
          content: message.prompt
        }
      );
      
      /** Queue the message to the thread (Runs the thread) */
      const currentRun = await this.openAI.beta.threads.runs.create(
        thread.id,
        { 
          assistant_id: message.assistantId
        }
      );

      let run: Run = currentRun;

      while(run.status !== 'completed'){
        console.log("=========== Checking again ======= ===== ");
        run = await this.openAI.beta.threads.runs.retrieve(
          thread.id,
          currentRun.id
        );

      }

      console.log("=========== Job Completed  =================")
      const messages = await this.openAI.beta.threads.messages.list(
        thread.id
      );
      console.log(messages.data[0].content);
      messageResponse.content = (<MessageContentText>messages.data[0].content[0]).text.value; 
      resolve(messageResponse);
    });
    
  }


}