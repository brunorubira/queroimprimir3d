import { PrismaService } from '../prisma/prisma.service';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(requestId: string, proposalId: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        requestId: string;
        proposalId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        request: {
            id: string;
            title: string;
            description: string;
            status: import(".prisma/client").$Enums.RequestStatus;
            clientId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        proposal: {
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
        };
    } & {
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        requestId: string;
        proposalId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findByClient(clientId: string): Promise<({
        request: {
            id: string;
            title: string;
            description: string;
            status: import(".prisma/client").$Enums.RequestStatus;
            clientId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        proposal: {
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
        };
    } & {
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        requestId: string;
        proposalId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findByProvider(providerId: string): Promise<({
        request: {
            client: {
                name: string;
            };
        } & {
            id: string;
            title: string;
            description: string;
            status: import(".prisma/client").$Enums.RequestStatus;
            clientId: string;
            createdAt: Date;
            updatedAt: Date;
        };
        proposal: {
            id: string;
            price: number;
            deliveryDays: number;
            description: string;
            status: import(".prisma/client").$Enums.ProposalStatus;
            requestId: string;
            providerId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        requestId: string;
        proposalId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    updateStatus(id: string, status: any): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        requestId: string;
        proposalId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
