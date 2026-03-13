import { PrismaService } from '../prisma/prisma.service';
export declare class ServicesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(providerId: string, data: {
        name: string;
        description?: string;
    }): Promise<{
        id: string;
        name: string;
        description: string | null;
        providerId: string;
    }>;
    findByProvider(providerId: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        providerId: string;
    }[]>;
}
