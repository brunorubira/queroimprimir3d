import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) {}

  async create(clientId: string, data: { title: string; description: string; attachments?: { url: string; filename: string; mimetype: string }[] }) {
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

  async findAll(options?: { clientId?: string; status?: import('@prisma/client').RequestStatus }) {
    const where: any = {};
    if (options?.clientId) {
      where.clientId = options.clientId;
    }
    if (options?.status) {
      where.status = options.status;
    }

    return this.prisma.request.findMany({
      where,
      include: {
        client: { select: { name: true } },
        attachments: true,
        proposals: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
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
}
