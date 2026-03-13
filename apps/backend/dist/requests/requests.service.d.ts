import { PrismaService } from '../prisma/prisma.service';
export declare class RequestsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(clientId: string, data: {
        title: string;
        description: string;
        attachments?: {
            url: string;
            filename: string;
            mimetype: string;
        }[];
    }): Promise<{
        attachments: {
            id: string;
            url: string;
            filename: string;
            mimetype: string;
            requestId: string;
        }[];
    } & {
        id: string;
        title: string;
        description: string;
        status: import(".prisma/client").$Enums.RequestStatus;
        clientId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(clientId?: string): Promise<({
        proposals: {
            id: string;
            price: number;
            deliveryDays: number;
            description: string;
            status: import(".prisma/client").$Enums.ProposalStatus;
            requestId: string;
            providerId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        attachments: {
            id: string;
            url: string;
            filename: string;
            mimetype: string;
            requestId: string;
        }[];
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
    })[]>;
    findOne(id: string): Promise<({
        proposals: ({
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
        })[];
        attachments: {
            id: string;
            url: string;
            filename: string;
            mimetype: string;
            requestId: string;
        }[];
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
    }) | null>;
}
