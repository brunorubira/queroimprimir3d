import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(email: string, pass: string, name: string) {
    // Basic registration logic (password hashing should be added)
    return this.usersService.create({
      email,
      password: pass,
      name,
    });
  }

  async login(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    return result;
  }
}
