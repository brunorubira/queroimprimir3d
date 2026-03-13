import { PrismaService } from '../prisma/prisma.service';
export declare class PrintersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(providerId: string, data: {
        model: string;
        technology: string;
        buildVolume?: string;
    }): Promise<{
        id: string;
        model: string;
        technology: string;
        buildVolume: string | null;
        providerId: string;
    }>;
    findByProvider(providerId: string): Promise<{
        id: string;
        model: string;
        technology: string;
        buildVolume: string | null;
        providerId: string;
    }[]>;
    remove(id: string): Promise<{
        id: string;
        model: string;
        technology: string;
        buildVolume: string | null;
        providerId: string;
    }>;
}
