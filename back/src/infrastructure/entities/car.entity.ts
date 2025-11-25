import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Stats } from './stats.entity';
import { Announcement } from './announcement.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column()
  marque: string;

  @Column({ nullable: true })
  perf: string;

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => User, user => user.cars)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => Stats, stats => stats.car)
  stats: Stats;

  @OneToMany(() => Announcement, announcement => announcement.car)
  announcements: Announcement[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
