export class CarModel {
  constructor(
    public id: number,
    public model: string,
    public marque: string,
    public perf: string | null,
    public user_id: number | null,
    public stats: any | null,
    public announcements: any[],
    public readonly created_at: Date,
    public readonly updated_at: Date,
  ) {}
}