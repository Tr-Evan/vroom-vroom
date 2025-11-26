import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { Stats } from '../../infrastructure/entities/stats.entity';
import { StatsController } from './stats.controller';
import { StatsRepository } from './stats.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Stats])],
  controllers: [StatsController],
  providers: [StatsService, StatsRepository],
  exports: [StatsService],
})
export class StatsModule {}