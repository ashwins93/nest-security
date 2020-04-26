import { Module } from '@nestjs/common';
import { SeedUserService } from './seed-user.service';
import { UsersModule } from 'src/users/users.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [UsersModule, RolesModule],
  providers: [SeedUserService],
  exports: [SeedUserService],
})
export class SeedUserModule {}
