import { PrismaService } from '../prisma/prisma.service';
export declare class ConversationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findOrCreate(userIds: string[]): Promise<{
        id: string;
        createdAt: Date;
    }>;
    findByUser(userId: string): Promise<({
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
