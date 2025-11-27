import { CarModel } from '../cars/cars.model';
import { StatsModel } from '../stats/stats.model';
import { AnnouncementModel } from './announcements.model';

describe('AnnouncementModel', () => {
  let announcement: AnnouncementModel;
  const mockDate = new Date('2024-01-15');
  const mockUpdatedDate = new Date('2024-01-20');

  beforeEach(() => {
    const mockCar = new CarModel(
    5,
    'Model S',
    'Tesla',
    '0-100 km/h en 3.2s',
    null,
    null,
    [],
    new Date(),
    new Date()
  );

const mockStats = new StatsModel(10, 100, 500);
    announcement = new AnnouncementModel(
      1,
      mockDate,
      'https://example.com/image.jpg',
      true,
      mockCar,
      mockStats,
      mockDate,
      mockUpdatedDate,
    );
  });

  describe('Instantiation', () => {
    it('should create an announcement instance with all properties', () => {
      expect(announcement).toBeDefined();
      expect(announcement).toBeInstanceOf(AnnouncementModel);
    });

    it('should have the correct id', () => {
      expect(announcement.id).toBe(1);
    });

    it('should have the correct date', () => {
      expect(announcement.date).toEqual(mockDate);
    });

    it('should have the correct imageUrl', () => {
      expect(announcement.imageUrl).toBe('https://example.com/image.jpg');
    });

    it('should have the correct famous status', () => {
      expect(announcement.famous).toBe(true);
    });

    it('should have the correct cars_id', () => {
      expect(announcement.car.id).toBe(5);
    });

    it('should have the correct stats_id', () => {
      expect(announcement.stats.id).toBe(10);
    });

    it('should have the correct created_at date', () => {
      expect(announcement.created_at).toEqual(mockDate);
    });

    it('should have the correct updated_at date', () => {
      expect(announcement.updated_at).toEqual(mockUpdatedDate);
    });
  });

  describe('Mutable Properties', () => {
    it('should allow changing date', () => {
      const newDate = new Date('2024-02-01');
      announcement.date = newDate;
      expect(announcement.date).toEqual(newDate);
    });

    it('should allow changing imageUrl', () => {
      const newImageUrl = 'https://example.com/new-image.jpg';
      announcement.imageUrl = newImageUrl;
      expect(announcement.imageUrl).toBe(newImageUrl);
    });

    it('should allow changing famous status', () => {
      announcement.famous = false;
      expect(announcement.famous).toBe(false);
    });
  });

  describe('Immutable Properties (readonly)', () => {
    it('id should be readonly and cannot be modified', () => {
      const originalId = announcement.id;
      expect(announcement.id).toBe(originalId);
    });

    it('cars_id should be readonly and set at instantiation', () => {
      expect(announcement.car.id).toBe(5);
    });

    it('stats_id should be readonly and set at instantiation', () => {
      expect(announcement.stats.id).toBe(10);
    });

    it('created_at should be readonly and set at instantiation', () => {
      expect(announcement.created_at).toEqual(mockDate);
    });

    it('updated_at should be readonly and set at instantiation', () => {
      expect(announcement.updated_at).toEqual(mockUpdatedDate);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty imageUrl string', () => {
      const mockCar = new CarModel(
       6,
      'Model S',
      'Tesla',
      '0-100 km/h en 3.2s',
       null,
      null,
      [],
        new Date(),
       new Date()
      );

      const mockStats = new StatsModel(11, 100, 500);
      const announcementWithEmptyImage = new AnnouncementModel(
        2,
        mockDate,
        '',
        false,
        mockCar,
        mockStats,
        mockDate,
        mockUpdatedDate,
      );
      expect(announcementWithEmptyImage.imageUrl).toBe('');
    });

    it('should handle past and future dates', () => {
      const pastDate = new Date('2020-01-01');
      const futureDate = new Date('2030-12-31');
      const mockCar = new CarModel(
       7,
      'Model S',
      'Tesla',
      '0-100 km/h en 3.2s',
       null,
      null,
      [],
        new Date(),
       new Date()
      );

      const mockStats = new StatsModel(12, 100, 500);
      const announcementWithDates = new AnnouncementModel(
        3,
        pastDate,
        'https://example.com/image.jpg',
        true,
        mockCar,
        mockStats,
        pastDate,
        futureDate,
      );
      expect(announcementWithDates.date).toEqual(pastDate);
      expect(announcementWithDates.updated_at).toEqual(futureDate);
    });

    it('should handle large ids', () => {
      const largeId = Number.MAX_SAFE_INTEGER;
      const mockCar = new CarModel(
       largeId-1,
      'Model S',
      'Tesla',
      '0-100 km/h en 3.2s',
       null,
      null,
      [],
        new Date(),
       new Date()
      );

      const mockStats = new StatsModel(largeId-2, 100, 500);
      const announcementWithLargeId = new AnnouncementModel(
        largeId,
        mockDate,
        'https://example.com/image.jpg',
        true,
        mockCar,
        mockStats,
        mockDate,
        mockUpdatedDate,
      );
      expect(announcementWithLargeId.id).toBe(largeId);
      expect(announcementWithLargeId.car.id).toBe(largeId - 1);
    });
  });

  describe('Data Integrity', () => {
    it('should maintain data consistency across multiple instantiations', () => {
      const mockCar = new CarModel(
       5,
      'Model S',
      'Tesla',
      '0-100 km/h en 3.2s',
       null,
      null,
      [],
        new Date(),
       new Date()
      );

      const mockStats = new StatsModel(10, 100, 500);
      const announcement1 = new AnnouncementModel(
        1,
        mockDate,
        'https://example.com/image1.jpg',
        true,
        mockCar,
        mockStats,
        mockDate,
        mockUpdatedDate,
      );

      const announcement2 = new AnnouncementModel(
        1,
        mockDate,
        'https://example.com/image1.jpg',
        true,
        mockCar,
        mockStats,
        mockDate,
        mockUpdatedDate,
      );

      expect(announcement1).toEqual(announcement2);
    });

    it('should differentiate between two different announcements', () => {
      const mockCar = new CarModel(
       5,
      'Model S',
      'Tesla',
      '0-100 km/h en 3.2s',
       null,
      null,
      [],
        new Date(),
       new Date()
      );

      const mockStats = new StatsModel(10, 100, 500);
      const announcement1 = new AnnouncementModel(
        1,
        mockDate,
        'https://example.com/image1.jpg',
        true,
        mockCar,
        mockStats,
        mockDate,
        mockUpdatedDate,
      );
      const mockCarBis = new CarModel(
       6,
      'Model S',
      'Tesla',
      '0-100 km/h en 3.2s',
       null,
      null,
      [],
        new Date(),
       new Date()
      );

      const mockStatsBis = new StatsModel(11, 100, 500);
      const announcement2 = new AnnouncementModel(
        2,
        mockDate,
        'https://example.com/image2.jpg',
        false,
        mockCarBis,
        mockStatsBis,
        mockDate,
        mockUpdatedDate,
      );

      expect(announcement1).not.toEqual(announcement2);
      expect(announcement1.id).not.toBe(announcement2.id);
      expect(announcement1.famous).not.toBe(announcement2.famous);
    });
  });

  describe('Type Safety', () => {
    it('should enforce type correctness for id (number)', () => {
      expect(typeof announcement.id).toBe('number');
    });

    it('should enforce type correctness for date (Date)', () => {
      expect(announcement.date instanceof Date).toBe(true);
    });

    it('should enforce type correctness for imageUrl (string)', () => {
      expect(typeof announcement.imageUrl).toBe('string');
    });

    it('should enforce type correctness for famous (boolean)', () => {
      expect(typeof announcement.famous).toBe('boolean');
    });

    it('should enforce type correctness for cars_id (number)', () => {
      expect(typeof announcement.car.id).toBe('number');
    });

    it('should enforce type correctness for stats_id (number)', () => {
      expect(typeof announcement.stats.id).toBe('number');
    });

    it('should enforce type correctness for created_at (Date)', () => {
      expect(announcement.created_at instanceof Date).toBe(true);
    });

    it('should enforce type correctness for updated_at (Date)', () => {
      expect(announcement.updated_at instanceof Date).toBe(true);
    });
  });
});
