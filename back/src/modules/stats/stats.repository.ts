import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StatsModel } from "../../modules/stats/stats.model";
import { Repository } from "typeorm";
import { CreateStatsDto, UpdateStatsDto } from "./stats.type";
import { Stats } from "../../infrastructure/entities/stats.entity";

@Injectable()
export class StatsRepository {
  constructor(
    @InjectRepository(Stats)
    private readonly repo: Repository<Stats>,
  ) {}

  private toModel(entity: Stats): StatsModel {
    return new StatsModel(
      entity.id,
      entity.favoris,
      entity.views,
    );
  }

  async findAll(): Promise<StatsModel[]> {
    const entities = await this.repo.find();

    return entities.map(e => this.toModel(e));
  }

  async findById(id: number): Promise<StatsModel | null> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['stats', 'announcements'],
    });

    return entity ? this.toModel(entity) : null;
  }

  async create(data: CreateStatsDto): Promise<StatsModel> {
    const entity = this.repo.create(data);
    const saved = await this.repo.save(entity);
    return this.toModel(saved);
  }

  async update(id: number, data: UpdateStatsDto): Promise<StatsModel | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
