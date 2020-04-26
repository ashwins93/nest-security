import { RoleDto } from 'src/roles/dto/role.dto';

export class CreateUserDto {
  email: string;
  password: string;
  roles: RoleDto[];
}
