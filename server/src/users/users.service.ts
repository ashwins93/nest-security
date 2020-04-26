import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository, Connection } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService,
    private connection: Connection,
  ) {}

  async createUser(userParams: CreateUserDto) {
    const newUser = new User();
    newUser.email = userParams.email;
    await newUser.setPassword(userParams.password);

    return this.connection
      .transaction(async manager => {
        for (const role of userParams.roles) {
          let userRole = await this.rolesService.findRoleByName(role.roleName);

          if (!userRole) {
            userRole = new Role();
            userRole.roleName = role.roleName;
          }

          newUser.addRole(userRole);
        }

        const createdUser = manager.save(newUser);

        return createdUser;
      })
      .catch(error => {
        console.error('Error creating user');
        throw error;
      });
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserCount(): Promise<number> {
    return this.usersRepository.count();
  }
}
