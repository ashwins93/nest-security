import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Auditable } from 'src/base/auditable.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity({ name: 'users' })
export class User extends Auditable {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role, {
    cascade: true,
  })
  @JoinTable()
  roles: Role[];

  getRoles(): Set<Role> {
    return new Set(this.roles);
  }

  addRole(role: Role) {
    if (!this.roles) {
      this.roles = [role];
      return;
    }
    this.roles.push(role);
  }

  async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }

  async verifyPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}
