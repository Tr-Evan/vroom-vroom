import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Car } from './car.entity';
import { Announcement } from './announcement.entity';

@Entity('stats')
export class Stats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cars_id: number;

  @Column({ default: 0 })
  favoris: number;

  @Column({ default: 0 })
  views: number;

  @OneToOne(() => Car, car => car.stats)
  @JoinColumn({ name: 'cars_id' })
  car: Car;

  @OneToMany(() => Announcement, announcement => announcement.stats)
  announcements: Announcement[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}