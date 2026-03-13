import { Controller, Get, Post, Body, Param, UseGuards, Request, Query } from '@nestjs/common';

import { RequestsService } from './requests.service';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  async create(@Body() createRequestDto: any) {
    // In a real app, obtain clientId from JWT
    const clientId = createRequestDto.clientId; 
    return this.requestsService.create(clientId, createRequestDto);
  }

  @Get()
  async findAll(@Query('clientId') clientId?: string) {
    return this.requestsService.findAll(clientId);
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }
}
