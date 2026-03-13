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

  async findByUserId(userId: string) {
    return this.prisma.provider.findUnique({
      where: { userId },
      include: {
        user: { select: { name: true, email: true } },
        printers: true,
        services: true,
      },
    });
  }

  async updateByUserId(userId: string, data: { bio?: string; location?: string }) {
    const provider = await this.prisma.provider.findUnique({ where: { userId } });
    if (!provider) {
      // Auto-create if doesn't exist yet
      return this.prisma.provider.create({
        data: { userId, ...data },
        include: { user: { select: { name: true } }, printers: true },
      });
    }
    return this.prisma.provider.update({
      where: { userId },
      data,
      include: { user: { select: { name: true } }, printers: true },
    });
  }

  async addPrinter(userId: string, data: { model: string; technology: string; buildVolume?: string }) {
    const provider = await this.prisma.provider.findUnique({ where: { userId } });
    if (!provider) throw new Error('Provider profile not found');
    return this.prisma.printer.create({
      data: { ...data, providerId: provider.id },
    });
  }

  async removePrinter(userId: string, printerId: string) {
    const provider = await this.prisma.provider.findUnique({ where: { userId } });
    if (!provider) throw new Error('Provider profile not found');
    return this.prisma.printer.deleteMany({
      where: { id: printerId, providerId: provider.id },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.provider.update({
      where: { id },
      data,
    });
  }
}
