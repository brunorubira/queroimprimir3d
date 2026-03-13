import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  // Public: list all providers for the discovery page
  @Get()
  findAll() {
    return this.providersService.findAll();
  }

  // Authenticated: get own provider profile
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMyProfile(@Request() req) {
    return this.providersService.findByUserId(req.user.id);
  }

  // Authenticated: update own provider profile (bio, location)
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMyProfile(@Request() req, @Body() data: { bio?: string; location?: string }) {
    return this.providersService.updateByUserId(req.user.id, data);
  }

  // Authenticated: add a printer to own hub
  @UseGuards(JwtAuthGuard)
  @Post('me/printers')
  addPrinter(
    @Request() req,
    @Body() data: { model: string; technology: string; buildVolume?: string },
  ) {
    return this.providersService.addPrinter(req.user.id, data);
  }

  // Authenticated: remove a printer
  @UseGuards(JwtAuthGuard)
  @Delete('me/printers/:printerId')
  removePrinter(@Request() req, @Param('printerId') printerId: string) {
    return this.providersService.removePrinter(req.user.id, printerId);
  }

  // Get a specific provider by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.providersService.findOne(id);
  }
}
