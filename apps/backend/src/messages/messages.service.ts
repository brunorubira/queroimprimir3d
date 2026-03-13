import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(conversationId: string, senderId: string, content: string) {
    return this.prisma.message.create({
      data: {
        conversationId,
        senderId,
        content,
      },
    });
  }

  async findByConversation(conversationId: string) {
    return this.prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      include: { sender: { select: { name: true } } },
    });
  }
}
