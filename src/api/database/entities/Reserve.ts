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
import { Exclude } from 'class-transformer';

@Entity()
export class Reserve {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, car => car.user, {
    onDelete: 'CASCADE',

  })
  @JoinColumn({ name: 'car_id' })
  car: Car;

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
