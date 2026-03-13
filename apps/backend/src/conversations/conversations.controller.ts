import { Controller, Get, Post, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('conversations')
@UseGuards(JwtAuthGuard)
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  async findOrCreate(@Body() data: { userIds: string[] }) {
    return this.conversationsService.findOrCreate(data.userIds);
  }

  @Get()
  async findByUser(@Request() req) {
    // Only fetch conversations for the authenticated user
    return this.conversationsService.findByUser(req.user.id);
  }
}
