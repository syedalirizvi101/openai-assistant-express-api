import { Router } from "express";
import { Message } from "./models/message";
import { OpenAIWrapper } from "./assistant";

const appRoutes = Router();

const openAI: OpenAIWrapper = new OpenAIWrapper();

appRoutes.post('/message', async(req,res)=>{

    let message: Message = req.body;

    try {
        let response = await openAI.sendMessage(message);
        res.send(response);
    }
    catch(err) {
        console.log(err);
    }
   
});

export default appRoutes;