import { PrismaService } from '../prisma/prisma.service';
export declare class MatchingService {
    private prisma;
    constructor(prisma: PrismaService);
    findCompatibleProviders(requestId: string): Promise<({
        user: {
            name: string;
        };
        boosts: {
            id: string;
            startDate: Date;
            endDate: Date;
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
}
