import { StatsModel } from './stats.model';

describe('StatsModel', () => {
  it('should be defined', () => {
    // GIVEN
    const id = 1, favoris = 10, views = 100;

    // WHEN
    const stat = new StatsModel(id, favoris, views);

    // THEN
    expect(stat).toBeDefined();
    expect(stat.id).toBe(id);
    expect(stat.favoris).toBe(favoris);
    expect(stat.views).toBe(views);
  });
});