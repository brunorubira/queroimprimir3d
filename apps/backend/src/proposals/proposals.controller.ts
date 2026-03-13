import { Controller, Get, Post, Body, Param, UseGuards, Request, Patch, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProposalsService } from './proposals.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('proposals')
@UseGuards(JwtAuthGuard)
export class ProposalsController {
  constructor(
    private readonly proposalsService: ProposalsService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  async create(@Request() req, @Body() body: { requestId: string; price: number; deliveryDays: number; description: string }) {
    if (req.user.role !== 'PROVIDER') {
      throw new UnauthorizedException('Somente prestadores podem enviar propostas.');
    }

    const provider = await this.prisma.provider.findUnique({
      where: { userId: req.user.id },
    });

    if (!provider) {
      throw new UnauthorizedException('Perfil de prestador não encontrado.');
    }

    return this.proposalsService.create({
      requestId: body.requestId,
      providerId: provider.id,
      price: Number(body.price),
      deliveryDays: Number(body.deliveryDays),
      description: body.description,
    });
  }

  @Get()
  async findAll(@Request() req) {
    if (req.user.role !== 'PROVIDER') {
      throw new UnauthorizedException('Somente prestadores podem ver suas próprias propostas desta forma.');
    }

    const provider = await this.prisma.provider.findUnique({
      where: { userId: req.user.id },
    });

    if (!provider) return [];

    return this.proposalsService.findAllByProvider(provider.id);
  }

  @Get('request/:id')
  async findByRequest(@Param('id') id: string) {
    return this.proposalsService.findByRequest(id);
  }

  @Patch(':id/accept')
  async accept(@Request() req, @Param('id') id: string) {
    if (req.user.role !== 'CLIENT') {
      throw new UnauthorizedException('Somente clientes podem aceitar propostas.');
    }

    // In a real app, we should also verify if the req.user is the owner of the Request
    // For now, accept it via the service which handles the transaction.
    return this.proposalsService.accept(id);
  }
}
