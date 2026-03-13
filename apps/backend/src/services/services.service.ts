import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(providerId: string, data: { name: string; description?: string }) {
    return this.prisma.service.create({
      data: {
        ...data,
        providerId,
      },
    });
  }

  async findByProvider(providerId: string) {
    return this.prisma.service.findMany({
      where: { providerId },
    });
  }
}
