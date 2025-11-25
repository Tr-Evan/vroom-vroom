import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Car } from './car.entity';
import { Stats } from './stats.entity';

@Entity('announcement')
export class Announcement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cars_id: number;

  @Column()
  stats_id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: false })
  famous: boolean;

  @ManyToOne(() => Car, car => car.announcements)
  @JoinColumn({ name: 'cars_id' })
  car: Car;

  @ManyToOne(() => Stats, stats => stats.announcements)
  @JoinColumn({ name: 'stats_id' })
  stats: Stats;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}