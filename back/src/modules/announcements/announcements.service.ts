import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from 'src/infrastructure/entities/announcement.entity';
import { Repository } from 'typeorm';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './announcements.types';
import { AnnouncementsRepository } from './announcements.repository';
import { AnnouncementModel } from './announcements.model';

@Injectable()
export class AnnouncementsService {
  constructor(
    private readonly announcementRepo: AnnouncementsRepository,
  ) {}

  async getAllAnnouncements(): Promise<AnnouncementModel[]> {
    return await this.announcementRepo.findAll();
  }

  async getAnnouncementById(id: number): Promise<AnnouncementModel | null> {
    return await this.announcementRepo.findById(id);
  }

  async createAnnouncement(data: CreateAnnouncementDto): Promise<AnnouncementModel> {
    return await this.announcementRepo.create(data);
  }

  async updateAnnouncement(id: number, data: UpdateAnnouncementDto): Promise<AnnouncementModel | null> {
    return await this.announcementRepo.update(id, data);
  }

  async deleteAnnouncement(id: number): Promise<void> {
    return await this.announcementRepo.delete(id);
  }
}
