import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(requestId: string, proposalId: string) {
    return this.prisma.order.create({
      data: {
        requestId,
        proposalId,
        status: 'CREATED',
      },
    });
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: {
        request: true,
        proposal: {
          include: {
            provider: {
              include: {
                user: {
                  select: { name: true }
                }
              }
            }
          }
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByClient(clientId: string) {
    return this.prisma.order.findMany({
      where: {
        request: {
          clientId: clientId
        }
      },
      include: {
        request: true,
        proposal: {
          include: {
            provider: {
              include: {
                user: {
                  select: { name: true }
                }
              }
            }
          }
        },
      },
    });
  }

  async findByProvider(providerId: string) {
    return this.prisma.order.findMany({
      where: {
        proposal: {
          providerId: providerId
        }
      },
      include: {
        request: {
          include: {
            client: {
              select: { name: true }
            }
          }
        },
        proposal: true,
      },
    });
  }

  async updateStatus(id: string, status: any) {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }
}
