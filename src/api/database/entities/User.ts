import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from './Car';
import { Reserve } from './Reserve';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, car => car.user, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'car_id' })
  car: Car;

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

  @OneToMany(() => Reserve, reserve => reserve.car, { cascade: true })
  reserve: Reserve[];

  @CreateDateColumn({ select: false })
  @Exclude()
  created_at: Date;

  @UpdateDateColumn({ select: false })
  @Exclude()
  updated_at: Date;
}
