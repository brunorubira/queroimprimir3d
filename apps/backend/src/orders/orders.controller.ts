import { Controller, Get, Post, Body, Param, Patch, Query, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() data: { requestId: string; proposalId: string }) {
    return this.ordersService.create(data.requestId, data.proposalId);
  }

  @Get()
  async findAll(@Request() req) {
    if (req.user.role === 'CLIENT') {
      return this.ordersService.findByClient(req.user.id);
    } else if (req.user.role === 'PROVIDER') {
      return this.ordersService.findByProvider(req.user.id);
    }
    return this.ordersService.findAll();
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }
}
