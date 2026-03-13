import { Controller, Get, Post, Body, Param, UseGuards, Request as Req } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('requests')
@UseGuards(JwtAuthGuard)
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  create(@Req() req, @Body() createData: { title: string; description: string }) {
    // Uses the authenticated user's ID as clientId
    return this.requestsService.create(req.user.id, createData);
  }

  @Get('my')
  findMyRequests(@Req() req) {
    // Only fetch requests made by the authenticated user
    return this.requestsService.findMyRequests(req.user.id);
  }

  @Get()
  findAllOpen() {
    // Fetch all open requests (Marketplace view for providers)
    return this.requestsService.findAllOpen();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }
}
