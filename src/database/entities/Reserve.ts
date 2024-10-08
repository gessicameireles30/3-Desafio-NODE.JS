import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from './Car';
import { User } from './User';
import { Exclude } from 'class-transformer';

@Entity()
export class Reserve {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, car => car.reserve, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @ManyToOne(() => User, user => user.reserves, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  chair: string;

  @Column()
  value: number;

  @CreateDateColumn({ select: false })
  @Exclude()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  @Exclude()
  updated_at: Date;
}
