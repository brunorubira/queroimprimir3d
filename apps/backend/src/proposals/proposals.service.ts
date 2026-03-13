import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProposalsService {
  constructor(private prisma: PrismaService) {}

  async create(data: { requestId: string; providerId: string; price: number; deliveryDays: number; description: string }) {
    return this.prisma.proposal.create({
      data,
    });
  }

  async findByRequest(requestId: string) {
    return this.prisma.proposal.findMany({
      where: { requestId },
      include: { provider: { include: { user: { select: { name: true } } } } },
    });
  }

  async accept(id: string) {
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
}
