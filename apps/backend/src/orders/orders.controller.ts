import { Controller, Get, Post, Body, Param, Patch, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() data: { requestId: string; proposalId: string }) {
    return this.ordersService.create(data.requestId, data.proposalId);
  }

  @Get()
  async findAll(@Query('clientId') clientId?: string, @Query('providerId') providerId?: string) {
    if (clientId) return this.ordersService.findByClient(clientId);
    if (providerId) return this.ordersService.findByProvider(providerId);
    return this.ordersService.findAll();
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }
}
