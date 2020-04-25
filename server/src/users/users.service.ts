import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './createUser.dto';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(userParams: CreateUserDto) {
    const newUser = new User();
    newUser.email = userParams.email;
    await newUser.setPassword(userParams.password);

    return this.usersRepository.save(newUser);
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
