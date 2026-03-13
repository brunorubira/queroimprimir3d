import { RequestsService } from './requests.service';
export declare class RequestsController {
    private readonly requestsService;
    constructor(requestsService: RequestsService);
    create(req: any, createRequestDto: any): Promise<{
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
    findAll(req: any, status?: string): Promise<({
        client: {
            name: string;
        };
        attachments: {
            id: string;
            url: string;
            filename: string;
            mimetype: string;
            requestId: string;
        }[];
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
        client: {
            name: string;
        };
        attachments: {
            id: string;
            url: string;
            filename: string;
            mimetype: string;
            requestId: string;
        }[];
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
