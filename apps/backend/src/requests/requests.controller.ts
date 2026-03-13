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
  async findAll(@Request() req, @Query('status') status?: string) {
    // Clients only see their own requests.
    if (req.user.role === 'CLIENT') {
      return this.requestsService.findAll({ 
        clientId: req.user.id, 
        status: status as any 
      });
    }
    
    // Providers can see requests across all clients, filtered by status (default OPEN)
    return this.requestsService.findAll({ 
      status: (status as any) || 'OPEN' 
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.requestsService.findOne(id);
  }
}
