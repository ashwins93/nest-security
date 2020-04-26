import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(credentials: LoginDto) {
    const user = await this.usersService.findUserByEmail(credentials.email);

    if (!user) {
      return null;
    }

    const valid = await user.verifyPassword(credentials.password);

    if (valid) return user;

    return null;
  }

  async login(user: User) {
    const payload = {
      sub: user.userId,
      email: user.email,
      roles: user.roles.map(r => r.roleName),
    };

    return {
      // eslint-disable-next-line
      access_token: this.jwtService.sign(payload),
    };
  }
}
