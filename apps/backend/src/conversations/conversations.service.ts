import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {}

  async findOrCreate(userIds: string[]) {
    // Basic logic to find a conversation between exactly these users or create a new one
    // In a real app, this would be more robust
    const conversation = await this.prisma.conversation.create({
      data: {
        participants: {
          create: userIds.map(id => ({ userId: id })),
        },
      },
    });
    return conversation;
  }

  async findByUser(userId: string) {
    return this.prisma.conversation.findMany({
      where: {
        participants: { some: { userId } },
      },
      include: {
        participants: { include: { user: { select: { name: true } } } },
        messages: { take: 1, orderBy: { createdAt: 'desc' } },
      },
    });
  }
}
