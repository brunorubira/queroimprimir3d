import { Controller, Get, Post, Param, UseGuards, Request as Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('accept-proposal/:proposalId')
  acceptProposal(@Req() req, @Param('proposalId') proposalId: string) {
    // Client accepts a proposal
    return this.ordersService.acceptProposal(req.user.id, proposalId);
  }

  @Get('my')
  findMyOrders(@Req() req) {
    // Uses the role from JWT to branch the DB query
    return this.ordersService.findMyOrders(req.user.id, req.user.role);
  }
}
