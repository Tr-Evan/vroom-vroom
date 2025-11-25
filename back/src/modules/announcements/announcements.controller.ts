import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { Announcement } from 'src/infrastructure/entities/announcement.entity';
import { CreateAnnouncementDto, UpdateAnnouncementDto } from './announcements.types';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Get()
  getAll(): Promise<Announcement[]> {
    return this.announcementsService.getAllAnnouncements();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Announcement | null> {
    return this.announcementsService.getAnnouncementById(+id);
  }

  @Post()
  create(@Body() data: CreateAnnouncementDto): Promise<Announcement> {
    return this.announcementsService.createAnnouncement(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateAnnouncementDto): Promise<Announcement | null> {
    return this.announcementsService.updateAnnouncement(+id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.announcementsService.deleteAnnouncement(+id);
  }
}
