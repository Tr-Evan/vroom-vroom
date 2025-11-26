import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { Announcement } from 'src/infrastructure/entities/announcement.entity';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './announcements.types';
import { AnnouncementModel } from './announcements.model';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get()
  getAll(): Promise<AnnouncementModel[]> {
    return this.announcementsService.getAllAnnouncements();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<AnnouncementModel | null> {
    return this.announcementsService.getAnnouncementById(+id);
  }

  @Post()
  create(@Body() data: CreateAnnouncementDto): Promise<AnnouncementModel> {
    return this.announcementsService.createAnnouncement(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateAnnouncementDto): Promise<AnnouncementModel | null> {
    return this.announcementsService.updateAnnouncement(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.announcementsService.deleteAnnouncement(+id);
  }
}
