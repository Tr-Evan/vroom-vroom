import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stats } from '../../infrastructure/entities/stats.entity';
import { CreateStatsDto, UpdateStatsDto } from './stats.type';
import { StatsRepository } from './stats.repository';
import { StatsModel } from './stats.model';

@Injectable()
export class StatsService {
  constructor(
    private readonly statsRepo: StatsRepository,
  ) {}

  async findAll(): Promise<StatsModel[]> {
    return await this.statsRepo.findAll();
  }

  async findById(id: number): Promise<StatsModel | null> {
    return await this.statsRepo.findById(id);
  }

  async create(data: CreateStatsDto): Promise<StatsModel> {
    return await this.statsRepo.create(data);
  }

  async update(id: number, data: UpdateStatsDto): Promise<StatsModel | null> {
    return await this.statsRepo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return await this.statsRepo.delete(id);
  }
}