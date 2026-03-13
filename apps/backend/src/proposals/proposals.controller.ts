import { Controller, Get, Post, Body, Param, UseGuards, Request as Req } from '@nestjs/common';
import { ProposalsService } from './proposals.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('proposals')
@UseGuards(JwtAuthGuard)
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Post()
  create(
    @Req() req, 
    @Body() data: { requestId: string; price: number; deliveryDays: number; description: string }
  ) {
    return this.proposalsService.create(req.user.id, data);
  }

  @Get('my')
  findMyProposals(@Req() req) {
    // Provider views their sent proposals
    return this.proposalsService.findMyProposals(req.user.id);
  }

  @Get('request/:id')
  findByRequest(@Req() req, @Param('id') requestId: string) {
    // Client views proposals received for their request
    return this.proposalsService.findByRequest(requestId, req.user.id);
  }
}
