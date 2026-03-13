import { Controller, Get, Param, NotFoundException, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findById(@Param('id') id: string, @Request() req) {
    if (req.user.id !== id && req.user.role !== 'ADMIN') {
      throw new ForbiddenException('Acesso negado');
    }
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    // Remove sensitive data
    const { password, ...result } = user;
    return result;
  }
}
