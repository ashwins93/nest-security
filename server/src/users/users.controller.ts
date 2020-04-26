import {
  Controller,
  Get,
  UseInterceptors,
  UseGuards,
  Request,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { TransformUserInterceptor } from './interceptors/transform-user.interceptor';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('api/v1/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseInterceptors(TransformUserInterceptor)
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getSelf(@Request() req) {
    return req.user;
  }
}
