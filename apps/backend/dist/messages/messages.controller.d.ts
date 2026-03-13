import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(data: {
        conversationId: string;
        senderId: string;
        content: string;
    }): Promise<{
        id: string;
        content: string;
        conversationId: string;
        senderId: string;
        createdAt: Date;
    }>;
    findByConversation(id: string): Promise<({
        sender: {
            name: string;
        };
    } & {
        id: string;
        content: string;
        conversationId: string;
        senderId: string;
        createdAt: Date;
    })[]>;
}
