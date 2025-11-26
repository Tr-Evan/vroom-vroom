import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../../infrastructure/entities/car.entity';
import { CreateCarDto, UpdateCarDto } from './cars.type';
import { CarsRepository } from './cars.repository';
import { CarModel } from './cars.model';

@Injectable()
export class CarsService {
  constructor(
    private readonly carsRepo: CarsRepository,
  ) {}

  async findAll(): Promise<CarModel[]> {
    return await this.carsRepo.findAll()
  }

  async findById(id: number): Promise<CarModel | null> {
    return this.carsRepo.findById(id)
  }

  async findByUserId(userId: number): Promise<CarModel[]> {
    return this.carsRepo.findByUserId(userId);
  }

  async create(data: CreateCarDto): Promise<CarModel> {
    return this.carsRepo.create(data);
  }

  async update(id: number, data: UpdateCarDto): Promise<CarModel | null> {
    return this.carsRepo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.carsRepo.delete(id);
  }
}