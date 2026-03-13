import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(@Body() data: { conversationId: string; senderId: string; content: string }) {
    return this.messagesService.create(data.conversationId, data.senderId, data.content);
  }

  @Get('conversation/:id')
  async findByConversation(@Param('id') id: string) {
    return this.messagesService.findByConversation(id);
  }
}
