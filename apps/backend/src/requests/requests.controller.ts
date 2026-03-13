import { Controller, Get, Post, Body, Param, UseGuards, Request, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestsService } from './requests.service';

@Controller('requests')
@UseGuards(JwtAuthGuard)
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  async create(@Request() req, @Body() createRequestDto: any) {
    const clientId = req.user.id; // Extracted securely from JWT
    return this.requestsService.create(clientId, createRequestDto);
  }

  @Get()
  async findAll(@Request() req) {
    // If the user wants to see only their requests
    return this.requestsService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }
}
