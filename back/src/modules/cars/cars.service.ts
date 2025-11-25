import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Car } from '../../infrastructure/entities/car.entity';
import { CreateCarDto, UpdateCarDto } from './cars.type';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carsRepo: Repository<Car>,
  ) {}

  async findAll(): Promise<Car[]> {
    return this.carsRepo.find({
      relations: ['user', 'stats', 'announcements'],
    });
  }

  async findById(id: number): Promise<Car | null> {
    return this.carsRepo.findOne({
      where: { id },
      relations: ['user', 'stats', 'announcements'],
    });
  }

  async findByUserId(userId: number): Promise<Car[]> {
    return this.carsRepo.find({
      where: { user_id: userId },
      relations: ['stats', 'announcements'],
    });
  }

  async create(data: CreateCarDto): Promise<Car> {
    const car = this.carsRepo.create(data);
    return this.carsRepo.save(car);
  }

  async update(id: number, data: UpdateCarDto): Promise<Car | null> {
    await this.carsRepo.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.carsRepo.delete(id);
  }
}