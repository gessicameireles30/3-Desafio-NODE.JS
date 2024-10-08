import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reserve } from './Reserve';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cpf: number;

  @Column('datetime')
  release_date: string;

  @Column()
  cep: string;

  @Column()
  email: string;

  @Column()
  password: number;

  @OneToMany(() => Reserve, reserve => reserve.user, { cascade: true })
  reserves: Reserve[];

  @CreateDateColumn({ select: false })
  @Exclude()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  @Exclude()
  updated_at: Date;
}
