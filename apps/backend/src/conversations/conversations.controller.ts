import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  async findOrCreate(@Body() data: { userIds: string[] }) {
    return this.conversationsService.findOrCreate(data.userIds);
  }

  @Get()
  async findByUser(@Query('userId') userId: string) {
    return this.conversationsService.findByUser(userId);
  }
}
