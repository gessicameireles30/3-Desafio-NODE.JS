import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,

} from 'typeorm';
import { User } from './User';
import { Exclude } from 'class-transformer';

@Entity()
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  year: number;

  @Column()
  valuePerDay: number;

  @Column('simple-array')
  accessories: string[];

  @Column()
  numberOfPassengers: number;

  @ManyToOne(() => User, user => user.car)
  user: User;

  @CreateDateColumn({ select: false })
  @Exclude()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  @Exclude()
  updated_at: Date;
}
