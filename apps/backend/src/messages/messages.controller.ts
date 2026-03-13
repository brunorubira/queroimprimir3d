import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async create(
    @Request() req,
    @Body() data: { conversationId: string; content: string },
  ) {
    // senderId always comes from the authenticated JWT — never from the body
    return this.messagesService.create(data.conversationId, req.user.id, data.content);
  }

  @Get('conversation/:id')
  async findByConversation(@Param('id') id: string) {
    return this.messagesService.findByConversation(id);
  }
}
