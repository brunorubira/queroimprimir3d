import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MatchingService {
  constructor(private prisma: PrismaService) {}

  async findCompatibleProviders(requestId: string) {
    const request = await this.prisma.request.findUnique({
      where: { id: requestId },
    });

    if (!request) return [];

    // Simple matching: Find all providers who have at least one printer
    // Boosted providers (Boost model) could appear first in a real scenario
    return this.prisma.provider.findMany({
      where: {
        printers: { some: {} },
      },
      include: {
        user: { select: { name: true } },
        boosts: {
          where: {
            endDate: { gt: new Date() },
          },
        },
      },
      orderBy: {
        boosts: { _count: 'desc' }, // Boosted first
      },
    });
  }
}
