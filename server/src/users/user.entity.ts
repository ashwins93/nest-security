import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Auditable } from 'src/base/auditable.entity';

@Entity({ name: 'users' })
export class User extends Auditable {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }

  async verifyPassword(password) {
    return bcrypt.compare(password, this.password);
  }
}
