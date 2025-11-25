import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './infrastructure/entities/user.entity';
import { Car } from './infrastructure/entities/car.entity';
import { Stats } from './infrastructure/entities/stats.entity';
import { Announcement } from './infrastructure/entities/announcement.entity';
import { UsersModule } from './modules/users/users.module';
import { StatsModule } from './modules/stats/stats.module';
import { AnnouncementsModule } from './modules/announcements/announcements.module';
import { CarsModule } from './modules/cars/cars.module';

import typeOrmConfig from './config/typeorm.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    StatsModule,
    CarsModule,
    AnnouncementsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
