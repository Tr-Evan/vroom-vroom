import { Test, TestingModule } from "@nestjs/testing";
import { AnnouncementsController } from "./announcements.controller";
import { AnnouncementModel } from "./announcements.model";
import { AnnouncementsRepository } from "./announcements.repository";
import { AnnouncementsService } from "./announcements.service";
import { CreateAnnouncementDto, UpdateAnnouncementDto } from "./announcements.types";
import { CarModel } from "../cars/cars.model";
import { StatsModel } from "../stats/stats.model";

describe('AnnouncementsController ', () => {
  let announcementsController: AnnouncementsController;
  let service: AnnouncementsService;
  let repoMock: jest.Mocked<AnnouncementsRepository>;

  const mockAnnouncementsRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnouncementsController],
      providers: [
        AnnouncementsService,
        {
          provide: AnnouncementsRepository,
          useValue: mockAnnouncementsRepository,
        },
      ],
    }).compile();

    announcementsController = module.get<AnnouncementsController>(AnnouncementsController);
    service = module.get<AnnouncementsService>(AnnouncementsService);
    repoMock = module.get(AnnouncementsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all announcements', async () => {
    //Given
    const mockCar = new CarModel(
      1,
      'Model S',
      'Tesla',
      '0-100 km/h en 3.2s',
      null,
      null,
      [],
      new Date(),
      new Date()
    );
    const mockStats = new StatsModel(1, 100, 500);
    const mockData: AnnouncementModel[] = [
      new AnnouncementModel(1, new Date(), 'url', true, mockCar, mockStats, new Date(), new Date()),
    ];
    repoMock.findAll.mockResolvedValue(mockData);

    //When
    const result = await announcementsController.getAll();

    //Then
    expect(result).toEqual(mockData);
    expect(repoMock.findAll).toHaveBeenCalled();
  });

  it('should return one announcements', async ()=> {
    //Given
    const mockCar = new CarModel(
      1,
      'Model S',
      'Tesla',
      '0-100 km/h en 3.2s',
      null,
      null,
      [],
      new Date(),
      new Date()
    );
    const mockStats = new StatsModel(1, 100, 500);
    const mockData: AnnouncementModel = new AnnouncementModel(1, new Date(), 'url', true, mockCar, mockStats, new Date(), new Date())
    repoMock.findById.mockResolvedValue(mockData)
    
    // When
    const result = await announcementsController.getOne('1')
    
    //Then
    expect(result).toEqual(mockData);
    expect(repoMock.findById).toHaveBeenCalled();
  })

  it('should create a new announcement', async () => {
    //Given
    const mockCar = new CarModel(
      1,
      'Model S',
      'Tesla',
      '0-100 km/h en 3.2s',
      null,
      null,
      [],
      new Date(),
      new Date()
    );
    const mockStats = new StatsModel(1, 100, 500);
    const dto: CreateAnnouncementDto = { date: new Date(), imageUrl: 'url', famous: true, cars_id: mockCar.id, stats_id: mockStats.id };
    const created = new AnnouncementModel(1, dto.date, dto.imageUrl, dto.famous, mockCar, mockStats, new Date(), new Date());
    repoMock.create.mockResolvedValue(created);

    //When
    const result = await announcementsController.create(dto);

    //Then
    expect(result).toEqual(created);
    expect(repoMock.create).toHaveBeenCalledWith(dto);
  });

  it('should update an announcement', async () => {
    //Given
    const mockCar = new CarModel(
       1,
      'Model S',
      'Tesla',
      '0-100 km/h en 3.2s',
       null,
      null,
      [],
        new Date(),
       new Date()
      );

      const mockStats = new StatsModel(1, 100, 500);
    const dto: UpdateAnnouncementDto = { famous: false };
    const updated = new AnnouncementModel(1, new Date(), 'url', false, mockCar, mockStats, new Date(), new Date());
    repoMock.update.mockResolvedValue(updated);
    repoMock.findById.mockResolvedValue(updated);

    //When
    const result = await announcementsController.update('1', dto);

    //Then
    expect(result).toEqual(updated);
    expect(repoMock.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete an announcement', async () => {
    //Given
    repoMock.delete.mockResolvedValue(undefined);

    //When
    await announcementsController.delete('1');

    //Then
    expect(repoMock.delete).toHaveBeenCalledWith(1);
  });

});