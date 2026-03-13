import { ProposalsService } from './proposals.service';
import { PrismaService } from '../prisma/prisma.service';
export declare class ProposalsController {
    private readonly proposalsService;
    private readonly prisma;
    constructor(proposalsService: ProposalsService, prisma: PrismaService);
    create(req: any, body: {
        requestId: string;
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
    findAll(req: any): Promise<({
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
    findByRequest(id: string): Promise<({
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
    accept(req: any, id: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        requestId: string;
        proposalId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
