import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {}

  async findOrCreate(userIds: string[]) {
    // Check if a conversation already exists between exactly these users
    const existing = await this.prisma.conversation.findFirst({
      where: {
        AND: userIds.map((id) => ({
          participants: { some: { userId: id } },
        })),
      },
      include: {
        participants: { include: { user: { select: { name: true, id: true } } } },
        messages: { take: 1, orderBy: { createdAt: 'desc' } },
      },
    });

    if (existing) return existing;

    // Create a new conversation
    return this.prisma.conversation.create({
      data: {
        participants: {
          create: userIds.map((id) => ({ userId: id })),
        },
      },
      include: {
        participants: { include: { user: { select: { name: true, id: true } } } },
        messages: { take: 1, orderBy: { createdAt: 'desc' } },
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.conversation.findMany({
      where: {
        participants: { some: { userId } },
      },
      include: {
        participants: { include: { user: { select: { name: true, id: true } } } },
        messages: { take: 1, orderBy: { createdAt: 'desc' } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string) {
    return this.prisma.conversation.findUnique({
      where: { id },
      include: {
        participants: { include: { user: { select: { name: true, id: true } } } },
        messages: {
          orderBy: { createdAt: 'asc' },
          include: { sender: { select: { name: true, id: true } } },
        },
      },
    });
  }
}
