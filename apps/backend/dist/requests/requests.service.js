"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RequestsService = class RequestsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(clientId, data) {
        return this.prisma.request.create({
            data: {
                title: data.title,
                description: data.description,
                clientId,
                attachments: {
                    create: data.attachments || [],
                },
            },
            include: {
                attachments: true,
            },
        });
    }
    async findAll(clientId) {
        return this.prisma.request.findMany({
            where: clientId ? { clientId } : {},
            include: {
                client: { select: { name: true } },
                attachments: true,
                proposals: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        return this.prisma.request.findUnique({
            where: { id },
            include: {
                client: { select: { name: true } },
                attachments: true,
                proposals: {
                    include: { provider: { include: { user: { select: { name: true } } } } },
                },
            },
        });
    }
};
exports.RequestsService = RequestsService;
exports.RequestsService = RequestsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RequestsService);
//# sourceMappingURL=requests.service.js.map