import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { Announcement } from 'src/infrastructure/entities/announcement.entity';
import { User } from 'src/infrastructure/entities/user.entity';
import { Car } from 'src/infrastructure/entities/car.entity';
import { AnnouncementsRepository } from './announcements.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Announcement, User, Car])],
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService,AnnouncementsRepository],
})
export class AnnouncementsModule {}