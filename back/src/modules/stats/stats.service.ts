import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stats } from '../../infrastructure/entities/stats.entity';
import { CreateStatsDto, UpdateStatsDto } from './stats.type';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stats)
    private readonly carsRepo: Repository<Stats>,
  ) {}

  async findAll(): Promise<Stats[]> {
    return this.carsRepo.find();
  }

  async findById(id: number): Promise<Stats | null> {
    return this.carsRepo.findOne({
      where: { id },
    });
  }

  async create(data: CreateStatsDto): Promise<Stats> {
    const car = this.carsRepo.create(data);
    return this.carsRepo.save(car);
  }

  async update(id: number, data: UpdateStatsDto): Promise<Stats | null> {
    await this.carsRepo.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.carsRepo.delete(id);
  }
}