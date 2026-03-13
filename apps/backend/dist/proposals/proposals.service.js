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
exports.ProposalsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProposalsService = class ProposalsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.proposal.create({
            data,
        });
    }
    async findAllByProvider(providerId) {
        return this.prisma.proposal.findMany({
            where: { providerId },
            include: {
                request: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByRequest(requestId) {
        return this.prisma.proposal.findMany({
            where: { requestId },
            include: { provider: { include: { user: { select: { name: true } } } } },
        });
    }
    async accept(id) {
        return this.prisma.$transaction(async (tx) => {
            const proposal = await tx.proposal.update({
                where: { id },
                data: { status: 'ACCEPTED' },
            });
            await tx.request.update({
                where: { id: proposal.requestId },
                data: { status: 'CLOSED' },
            });
            return tx.order.create({
                data: {
                    requestId: proposal.requestId,
                    proposalId: proposal.id,
                },
            });
        });
    }
};
exports.ProposalsService = ProposalsService;
exports.ProposalsService = ProposalsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProposalsService);
//# sourceMappingURL=proposals.service.js.map