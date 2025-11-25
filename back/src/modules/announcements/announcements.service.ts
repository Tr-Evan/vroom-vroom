import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from 'src/infrastructure/entities/announcement.entity';
import { Repository } from 'typeorm';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './announcements.types';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepo: Repository<Announcement>,
  ) {}

  getAllAnnouncements(): Promise<Announcement[]> {
    return this.announcementRepo.find({
      relations: ['car', 'stats'], 
    });
  }

  getAnnouncementById(id: number): Promise<Announcement | null> {
    return this.announcementRepo.findOne({
      where: { id },
      relations: ['car', 'stats'],
    });
  }
  async createAnnouncement(data: CreateAnnouncementDto): Promise<Announcement> {
    const announcement = this.announcementRepo.create(data);
    return this.announcementRepo.save(announcement);
  }

  async updateAnnouncement(id: number, data: UpdateAnnouncementDto): Promise<Announcement | null> {
    await this.announcementRepo.update(id, data);
    return this.getAnnouncementById(id);
  }

  async deleteAnnouncement(id: number): Promise<void> {
    await this.announcementRepo.delete(id);
  }
}
