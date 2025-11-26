import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CarModel } from "src/modules/cars/cars.model";
import { Repository } from "typeorm";
import { CreateCarDto, UpdateCarDto } from "src/modules/cars/cars.type";
import { Car } from "src/infrastructure/entities/car.entity";

@Injectable()
export class CarsRepository {
  constructor(
    @InjectRepository(Car)
    private readonly repo: Repository<Car>,
  ) {}

  private toModel(entity: Car): CarModel {
    return new CarModel(
      entity.id,
      entity.model,
      entity.marque,
      entity.perf,
      entity.user_id,
      entity.stats ?? null,
      entity.announcements ?? [],
      entity.created_at,
      entity.updated_at,
    );
  }

  async findAll(): Promise<CarModel[]> {
    const entities = await this.repo.find();

    return entities.map(e => this.toModel(e));
  }

  async findById(id: number): Promise<CarModel | null> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['user', 'stats', 'announcements'],
    });

    return entity ? this.toModel(entity) : null;
  }

  async findByUserId(userId: number): Promise<CarModel[]> {
    const entities = await this.repo.find({
      where: { user_id: userId },
      relations: ['stats', 'announcements'],
    });

    return entities.map(e => this.toModel(e));
  }

  async create(data: CreateCarDto): Promise<CarModel> {
    const entity = this.repo.create(data);
    const saved = await this.repo.save(entity);
    return this.toModel(saved);
  }

  async update(id: number, data: UpdateCarDto): Promise<CarModel | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
