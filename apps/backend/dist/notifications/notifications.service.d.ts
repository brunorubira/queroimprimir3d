import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, title: string, message: string): Promise<{
        id: string;
        title: string;
        message: string;
        isRead: boolean;
        userId: string;
        createdAt: Date;
    }>;
    findByUser(userId: string): Promise<{
        id: string;
        title: string;
        message: string;
        isRead: boolean;
        userId: string;
        createdAt: Date;
    }[]>;
    markAsRead(id: string): Promise<{
        id: string;
        title: string;
        message: string;
        isRead: boolean;
        userId: string;
        createdAt: Date;
    }>;
}
