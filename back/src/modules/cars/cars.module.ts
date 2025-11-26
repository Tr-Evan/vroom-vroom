import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car } from '../../infrastructure/entities/car.entity';
import { CarsRepository } from './cars.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  controllers: [CarsController],
  providers: [CarsService,CarsRepository],
  exports: [CarsService],
})
export class CarsModule {}