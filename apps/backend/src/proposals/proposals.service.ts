import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProposalStatus, RequestStatus } from '@prisma/client';

@Injectable()
export class ProposalsService {
  constructor(private prisma: PrismaService) {}

  async create(providerUserId: string, data: { requestId: string; price: number; deliveryDays: number; description: string }) {
    // Find provider profile by user id
    const provider = await this.prisma.provider.findUnique({
      where: { userId: providerUserId },
    });
    if (!provider) throw new NotFoundException('Provider profile not found');

    const request = await this.prisma.request.findUnique({
      where: { id: data.requestId },
    });
    if (!request) throw new NotFoundException('Request not found');
    if (request.status !== RequestStatus.OPEN) {
      throw new BadRequestException('Request is no longer OPEN for proposals');
    }

    // Check if provider already sent a proposal
    const existing = await this.prisma.proposal.findFirst({
      where: { providerId: provider.id, requestId: data.requestId }
    });
    if (existing) {
      throw new BadRequestException('You already sent a proposal for this request');
    }

    return this.prisma.proposal.create({
      data: {
        price: data.price,
        deliveryDays: data.deliveryDays,
        description: data.description,
        status: ProposalStatus.SENT,
        requestId: data.requestId,
        providerId: provider.id,
      },
    });
  }

  async findByRequest(requestId: string, clientUserId: string) {
    // Verify client owns the request
    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
    });
    if (!request) throw new NotFoundException('Request not found');
    if (request.clientId !== clientUserId) throw new BadRequestException('Not authorized to view these proposals');

    return this.prisma.proposal.findMany({
      where: { requestId },
      include: {
        provider: {
          include: {
            user: { select: { name: true } },
            printers: true,
          }
        }
      },
      orderBy: { price: 'asc' }, // Order by lowest price by default
    });
  }

  async findMyProposals(providerUserId: string) {
    const provider = await this.prisma.provider.findUnique({
      where: { userId: providerUserId },
    });
    if (!provider) throw new NotFoundException('Provider profile not found');

    return this.prisma.proposal.findMany({
      where: { providerId: provider.id },
      include: {
        request: {
          select: { title: true, status: true, client: { select: { name: true } } }
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
