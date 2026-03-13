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
        participants: ({
            user: {
                name: string;
            };
        } & {
            id: string;
            conversationId: string;
            userId: string;
        })[];
        messages: {
            id: string;
            content: string;
            conversationId: string;
            senderId: string;
            createdAt: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
    })[]>;
}
