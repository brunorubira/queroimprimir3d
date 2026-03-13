import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttachmentsService {
  constructor(private prisma: PrismaService) {}

  async updateRequestId(id: string, requestId: string) {
    return this.prisma.attachment.update({
      where: { id },
      data: { requestId },
    });
  }

  async remove(id: string) {
    return this.prisma.attachment.delete({
      where: { id },
    });
  }
}
