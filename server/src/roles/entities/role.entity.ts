import { Auditable } from 'src/base/auditable.entity';
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity({ name: 'roles' })
export class Role extends Auditable {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column({ nullable: false, unique: true })
  @Index()
  roleName: string;
}
