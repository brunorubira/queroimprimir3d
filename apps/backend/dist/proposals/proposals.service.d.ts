import { PrismaService } from '../prisma/prisma.service';
export declare class ProposalsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        requestId: string;
        providerId: string;
        price: number;
        deliveryDays: number;
        description: string;
    }): Promise<{
        id: string;
        price: number;
        deliveryDays: number;
        description: string;
        status: import(".prisma/client").$Enums.ProposalStatus;
        requestId: string;
        providerId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAllByProvider(providerId: string): Promise<({
        request: {
            id: string;
            title: string;
            description: string;
            status: import(".prisma/client").$Enums.RequestStatus;
            clientId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        price: number;
        deliveryDays: number;
        description: string;
        status: import(".prisma/client").$Enums.ProposalStatus;
        requestId: string;
        providerId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findByRequest(requestId: string): Promise<({
        provider: {
            user: {
                name: string;
            };
        } & {
            id: string;
            bio: string | null;
            rating: number;
            isVerified: boolean;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        price: number;
        deliveryDays: number;
        description: string;
        status: import(".prisma/client").$Enums.ProposalStatus;
        requestId: string;
        providerId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    accept(id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        requestId: string;
        proposalId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
