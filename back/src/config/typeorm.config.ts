// src/config/typeorm.config.ts
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from '../infrastructure/entities/user.entity';
import { Car } from '../infrastructure/entities/car.entity';
import { Stats } from '../infrastructure/entities/stats.entity';
import { Announcement } from '../infrastructure/entities/announcement.entity';

const configService = new ConfigService();

const typeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: [User, Car, Stats, Announcement],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
  charset: 'utf8mb4',
};

const dataSource = new DataSource(typeOrmConfig);
export default dataSource;
