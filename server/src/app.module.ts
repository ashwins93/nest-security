import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SeedUserModule } from './seed-user/seed-user.module';
import { SeedUserService } from './seed-user/seed-user.service';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'dev',
      password: 'password',
      database: 'activity_tracker',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UsersModule,
    SeedUserModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private seedUser: SeedUserService) {
    this.seedUser.seed('sa@sa.com');
  }
}
