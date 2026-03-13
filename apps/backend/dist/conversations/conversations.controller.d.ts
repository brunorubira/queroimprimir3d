import { ConversationsService } from './conversations.service';
export declare class ConversationsController {
    private readonly conversationsService;
    constructor(conversationsService: ConversationsService);
    findOrCreate(data: {
        userIds: string[];
    }): Promise<{
        id: string;
        createdAt: Date;
    }>;
    findByUser(req: any): Promise<({
        messages: {
            id: string;
            content: string;
            conversationId: string;
            senderId: string;
            createdAt: Date;
        }[];
        participants: ({
            user: {
                name: string;
            };
        } & {
            id: string;
            conversationId: string;
            userId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
    })[]>;
}
