export class Message {
    threadId?: string;
    assistantId: string;
    prompt: string;

}

export class MessageResponse {
    content: string;
    threadId: string;
}