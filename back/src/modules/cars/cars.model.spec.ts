import { CarModel } from "./cars.model";

describe("carsModel", ()=>{
  it("should create car model", () => {
    // GIVEN
    const now = new Date();
    const later = new Date();

    // WHEN
    const car = new CarModel(
      1,
      'A45 AMG',
      'Mercedes',
      'Très performante',
      10,
      { hp: 360, torque: 480 },
      [{ id: 1, title: 'Annonce test' }],
      now,
      later
    );

    // THEN
    expect(car).toBeDefined();
    expect(car.id).toBe(1);
    expect(car.model).toBe('A45 AMG');
    expect(car.marque).toBe('Mercedes');
    expect(car.perf).toBe('Très performante');
    expect(car.userId).toBe(10);
    expect(car.stats).toEqual({ hp: 360, torque: 480 });
    expect(car.announcements).toHaveLength(1);
    expect(car.createdAt).toBe(now);
    expect(car.updatedAt).toBe(later);
    })
})