import { OrdersService } from './orders.service';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(data: {
        requestId: string;
        proposalId: string;
    }): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        requestId: string;
        proposalId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(clientId?: string, providerId?: string): Promise<({
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
    })[] | ({
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
    updateStatus(id: string, status: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        requestId: string;
        proposalId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
