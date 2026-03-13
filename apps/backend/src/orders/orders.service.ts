import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus, ProposalStatus, RequestStatus, Role } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async acceptProposal(clientUserId: string, proposalId: string) {
    const proposal = await this.prisma.proposal.findUnique({
      where: { id: proposalId },
      include: { request: true },
    });
    
    if (!proposal) throw new NotFoundException('Proposal not found');
    if (proposal.request.clientId !== clientUserId) {
      throw new UnauthorizedException('You can only accept proposals for your own requests');
    }
    if (proposal.status !== ProposalStatus.SENT) {
      throw new BadRequestException('This proposal has already been handled');
    }
    if (proposal.request.status !== RequestStatus.OPEN) {
      throw new BadRequestException('The request is no longer open');
    }

    // Wrap the transaction
    return this.prisma.$transaction(async (tx) => {
      // 1. Create the Order
      const order = await tx.order.create({
        data: {
          status: OrderStatus.CREATED,
          requestId: proposal.requestId,
          proposalId: proposal.id,
        },
      });

      // 2. Accept this proposal
      await tx.proposal.update({
        where: { id: proposal.id },
        data: { status: ProposalStatus.ACCEPTED },
      });

      // 3. Mark request as matching/closed
      await tx.request.update({
        where: { id: proposal.requestId },
        data: { status: RequestStatus.MATCHING },
      });

      // 4. (Optional MVP simplifier) Reject all other proposals for this request
      await tx.proposal.updateMany({
        where: { 
          requestId: proposal.requestId, 
          id: { not: proposal.id },
          status: ProposalStatus.SENT,
        },
        data: { status: ProposalStatus.REJECTED },
      });

      return order;
    });
  }

  async findMyOrders(userId: string, role: Role) {
    if (role === Role.CLIENT) {
      // Return orders where user is the client
      return this.prisma.order.findMany({
        where: { request: { clientId: userId } },
        include: {
          request: { select: { title: true, description: true } },
          proposal: { 
            include: { 
              provider: { include: { user: { select: { name: true } } } } 
            }
          }
        },
        orderBy: { createdAt: 'desc' },
      });
    } else if (role === Role.PROVIDER) {
      // Return orders where user is the provider
      const provider = await this.prisma.provider.findUnique({ where: { userId } });
      if (!provider) return [];
      
      return this.prisma.order.findMany({
        where: { proposal: { providerId: provider.id } },
        include: {
          request: { select: { title: true, description: true, client: { select: { name: true } } } },
          proposal: { select: { price: true, deliveryDays: true } }
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return [];
  }
}
