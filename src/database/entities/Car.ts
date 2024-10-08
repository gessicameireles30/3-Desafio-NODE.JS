import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Reserve } from './Reserve';

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
  pricePerDay: number;

  @ManyToOne(() => Reserve, reserve => reserve.car)
  reserve: Reserve


}
