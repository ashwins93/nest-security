import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { RoleDto } from './dto/role.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepo: Repository<Role>,
  ) {}

  async createRole(role: RoleDto): Promise<Role> {
    const newRole = new Role();
    newRole.roleName = role.roleName;
    return this.rolesRepo.save(newRole);
  }

  async findRoleByName(roleName: string) {
    const role = await this.rolesRepo.findOne({
      roleName,
    });
    return role;
  }
}
