import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PrintersService {
  constructor(private prisma: PrismaService) {}

  async create(providerId: string, data: { model: string; technology: string; buildVolume?: string }) {
    return this.prisma.printer.create({
      data: {
        ...data,
        providerId,
      },
    });
  }

  async findByProvider(providerId: string) {
    return this.prisma.printer.findMany({
      where: { providerId },
    });
  }

  async remove(id: string) {
    return this.prisma.printer.delete({
      where: { id },
    });
  }
}
