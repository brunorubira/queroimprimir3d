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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const proposals_service_1 = require("./proposals.service");
const prisma_service_1 = require("../prisma/prisma.service");
let ProposalsController = class ProposalsController {
    proposalsService;
    prisma;
    constructor(proposalsService, prisma) {
        this.proposalsService = proposalsService;
        this.prisma = prisma;
    }
    async create(req, body) {
        if (req.user.role !== 'PROVIDER') {
            throw new common_1.UnauthorizedException('Somente prestadores podem enviar propostas.');
        }
        const provider = await this.prisma.provider.findUnique({
            where: { userId: req.user.id },
        });
        if (!provider) {
            throw new common_1.UnauthorizedException('Perfil de prestador não encontrado.');
        }
        return this.proposalsService.create({
            requestId: body.requestId,
            providerId: provider.id,
            price: Number(body.price),
            deliveryDays: Number(body.deliveryDays),
            description: body.description,
        });
    }
    async findAll(req) {
        if (req.user.role !== 'PROVIDER') {
            throw new common_1.UnauthorizedException('Somente prestadores podem ver suas próprias propostas desta forma.');
        }
        const provider = await this.prisma.provider.findUnique({
            where: { userId: req.user.id },
        });
        if (!provider)
            return [];
        return this.proposalsService.findAllByProvider(provider.id);
    }
    async findByRequest(id) {
        return this.proposalsService.findByRequest(id);
    }
    async accept(req, id) {
        if (req.user.role !== 'CLIENT') {
            throw new common_1.UnauthorizedException('Somente clientes podem aceitar propostas.');
        }
        return this.proposalsService.accept(id);
    }
};
exports.ProposalsController = ProposalsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProposalsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProposalsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('request/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalsController.prototype, "findByRequest", null);
__decorate([
    (0, common_1.Patch)(':id/accept'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProposalsController.prototype, "accept", null);
exports.ProposalsController = ProposalsController = __decorate([
    (0, common_1.Controller)('proposals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [proposals_service_1.ProposalsService,
        prisma_service_1.PrismaService])
], ProposalsController);
//# sourceMappingURL=proposals.controller.js.map