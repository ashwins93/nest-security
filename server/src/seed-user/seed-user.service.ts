import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class SeedUserService {
  constructor(
    private userService: UsersService,
    private rolesService: RolesService,
  ) {}

  async seed(email = 'user@example.com', password = 'password'): Promise<void> {
    const userCount = await this.userService.findUserCount();

    if (userCount === 0) {
      await this.userService.createUser({
        email,
        password,
        roles: [
          {
            roleName: 'admin',
          },
        ],
      });
    }
  }
}
