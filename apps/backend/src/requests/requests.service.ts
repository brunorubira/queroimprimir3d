import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RequestStatus } from '@prisma/client';

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}

  async create(clientId: string, data: { title: string; description: string }) {
    return this.prisma.request.create({
      data: {
        title: data.title,
        description: data.description,
        status: RequestStatus.OPEN,
        clientId,
      },
    });
  }

  async findMyRequests(clientId: string) {
    return this.prisma.request.findMany({
      where: { clientId },
      include: {
        proposals: {
          select: { id: true, price: true, status: true, provider: { include: { user: { select: { name: true } } } } }
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllOpen() {
    return this.prisma.request.findMany({
      where: { status: RequestStatus.OPEN },
      include: {
        client: { select: { name: true, id: true } },
        _count: { select: { proposals: true } }, // How many proposals received
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const request = await this.prisma.request.findUnique({
      where: { id },
      include: {
        client: { select: { name: true, id: true } },
        proposals: {
          include: {
            provider: {
              include: { user: { select: { name: true } } }
            }
          }
        }
      },
    });
    if (!request) {
      throw new NotFoundException('Request not found');
    }
    return request;
  }
}
