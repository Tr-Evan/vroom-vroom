import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnouncementModel } from './announcements.model';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './announcements.types';
import { Announcement } from '../../infrastructure/entities/announcement.entity';

@Injectable()
export class AnnouncementsRepository {
  constructor(
    @InjectRepository(Announcement)
    private readonly repo: Repository<Announcement>,
  ) {}

  private toModel(entity: Announcement): AnnouncementModel {
    return new AnnouncementModel(
      entity.id,
      entity.date,
      entity.imageUrl,
      entity.famous,
      entity.car,
      entity.stats,
      entity.created_at,
      entity.updated_at,
    );
  }

  async findAll(): Promise<AnnouncementModel[]> {
    const entities = await this.repo.find({
      relations: ['car', 'stats'],
    });
    return entities.map(e => this.toModel(e));
  }

  async findById(id: number): Promise<AnnouncementModel | null> {
    const entity = await this.repo.findOne({
      where: { id },
      relations: ['car', 'stats'],
    });
    return entity ? this.toModel(entity) : null;
  }

  async create(data: CreateAnnouncementDto): Promise<AnnouncementModel> {
    const entity = this.repo.create(data);
    const saved = await this.repo.save(entity);
    return this.toModel(saved);
  }

  async update(id: number, data: UpdateAnnouncementDto): Promise<AnnouncementModel | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

}