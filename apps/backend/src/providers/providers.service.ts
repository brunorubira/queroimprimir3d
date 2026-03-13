import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProvidersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: { bio?: string }) {
    return this.prisma.provider.create({
      data: {
        ...data,
        userId,
      },
    });
  }

  async findAll() {
    return this.prisma.provider.findMany({
      include: {
        user: { select: { name: true, email: true } },
        printers: true,
        services: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.provider.findUnique({
      where: { id },
      include: {
        user: { select: { name: true } },
        printers: true,
        services: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.provider.update({
      where: { id },
      data,
    });
  }
}
