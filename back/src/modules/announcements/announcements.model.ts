import { CarModel } from '../cars/cars.model';
import { StatsModel } from '../stats/stats.model';

export class AnnouncementModel {
  constructor(
    public readonly id: number,
    public date: Date,
    public imageUrl: string,
    public famous: boolean,
    public readonly car: CarModel,
    public readonly stats: StatsModel,
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}
}
