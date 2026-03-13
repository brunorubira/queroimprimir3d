import { PrismaService } from '../prisma/prisma.service';
export declare class ProvidersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, data: {
        bio?: string;
    }): Promise<{
        id: string;
        bio: string | null;
        rating: number;
        isVerified: boolean;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        user: {
            email: string;
            name: string;
        };
        printers: {
            id: string;
            model: string;
            technology: string;
            buildVolume: string | null;
            providerId: string;
        }[];
        services: {
            id: string;
            name: string;
            description: string | null;
            providerId: string;
        }[];
    } & {
        id: string;
        bio: string | null;
        rating: number;
        isVerified: boolean;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<({
        user: {
            name: string;
        };
        printers: {
            id: string;
            model: string;
            technology: string;
            buildVolume: string | null;
            providerId: string;
        }[];
        services: {
            id: string;
            name: string;
            description: string | null;
            providerId: string;
        }[];
    } & {
        id: string;
        bio: string | null;
        rating: number;
        isVerified: boolean;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    update(id: string, data: any): Promise<{
        id: string;
        bio: string | null;
        rating: number;
        isVerified: boolean;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
