import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsService } from './stats.service';
import { Stats } from '../../infrastructure/entities/stats.entity';
import { StatsController } from './stats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Stats])],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}