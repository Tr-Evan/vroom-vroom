export class CreateCarDto {
  model: string;
  marque: string;
  perf?: string;
  user_id?: number;
}

export class UpdateCarDto {
  model?: string;
  marque?: string;
  perf?: string;
  user_id?: number;
}