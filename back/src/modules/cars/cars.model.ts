export class CarModel {
  constructor(
    public id: number,
    public model: string,
    public marque: string,
    public perf: string | null,
    public userId: number | null,
    public stats: any | null,
    public announcements: any[],
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}