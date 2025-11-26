export class AnnouncementModel {
  constructor(
    public readonly id: number,
    public date: Date,
    public imageUrl: string,
    public famous: boolean,
    public readonly cars_id: number,
    public readonly stats_id: number,
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}
}