export class CreateAnnouncementDto {
  cars_id: number;
  stats_id: number;
  date: Date;
  imageUrl: string;
  famous: boolean = false;
}

export class UpdateAnnouncementDto {
  cars_id?: number;
  stats_id?: number;
  date?: string;
  famous?: boolean;
}