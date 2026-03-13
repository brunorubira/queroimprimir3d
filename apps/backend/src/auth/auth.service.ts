import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(email: string, pass: string, name: string, role?: any) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(pass, saltRounds);

    try {
      return await this.usersService.create({
        email,
        password: hashedPassword,
        name,
        ...(role && { role }),
      });
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Este e-mail já está em uso');
      }
      throw error;
    }
  }

  async login(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    
    // Return the JWT Token
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    };
  }
}
