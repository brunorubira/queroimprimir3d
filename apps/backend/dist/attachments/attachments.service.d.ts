import { PrismaService } from '../prisma/prisma.service';
export declare class AttachmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    updateRequestId(id: string, requestId: string): Promise<{
        id: string;
        url: string;
        filename: string;
        mimetype: string;
        requestId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        url: string;
        filename: string;
        mimetype: string;
        requestId: string;
    }>;
}
