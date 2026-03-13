import { PrismaService } from '../prisma/prisma.service';
export declare class MessagesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(conversationId: string, senderId: string, content: string): Promise<{
        id: string;
        content: string;
        conversationId: string;
        senderId: string;
        createdAt: Date;
    }>;
    findByConversation(conversationId: string): Promise<({
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
