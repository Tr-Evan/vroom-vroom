import { Test, TestingModule } from "@nestjs/testing";
import { AnnouncementModel } from "./announcements.model";
import { AnnouncementsRepository } from "./announcements.repository";
import { AnnouncementsService } from "./announcements.service";
import { CreateAnnouncementDto, UpdateAnnouncementDto } from "./announcements.types";

describe('AnnouncementsService ', () => {
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
      providers: [
        AnnouncementsService,
        {
          provide: AnnouncementsRepository,
          useValue: mockAnnouncementsRepository,
        },
      ],
    }).compile();

    service = module.get<AnnouncementsService>(AnnouncementsService);
    repoMock = module.get(AnnouncementsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all announcements', async () => {
    //Given
    const mockData: AnnouncementModel[] = [
      new AnnouncementModel(1, new Date(), 'url', true, 1, 1, new Date(), new Date()),
    ];
    repoMock.findAll.mockResolvedValue(mockData);

    //When
    const result = await service.getAllAnnouncements();

    //Then
    expect(result).toEqual(mockData);
    expect(repoMock.findAll).toHaveBeenCalled();
  });

  it('should return one announcements', async ()=> {
    //Given
    const mockData: AnnouncementModel = new AnnouncementModel(1, new Date(), 'url', true, 1, 1, new Date(), new Date())
    repoMock.findById.mockResolvedValue(mockData)

    //When
    const result = await service.getAnnouncementById(1);
    
    //Then
    expect(result).toEqual(mockData);
    expect(repoMock.findById).toHaveBeenCalled();
  })

  it('should create a new announcement', async () => {
    //Given
    const dto: CreateAnnouncementDto = { date: new Date(), imageUrl: 'url', famous: true, cars_id: 1, stats_id: 1 };
    const created = new AnnouncementModel(1, dto.date, dto.imageUrl, dto.famous, dto.cars_id, dto.stats_id, new Date(), new Date());
    repoMock.create.mockResolvedValue(created);

    //When
    const result = await  service.createAnnouncement(dto);

    //Then
    expect(result).toEqual(created);
    expect(repoMock.create).toHaveBeenCalledWith(dto);
  });

  it('should update an announcement', async () => {
    //Given
    const dto: UpdateAnnouncementDto = { famous: false };
    const updated = new AnnouncementModel(1, new Date(), 'url', false, 1, 1, new Date(), new Date());
    repoMock.update.mockResolvedValue(updated);
    repoMock.findById.mockResolvedValue(updated);

    //When
    const result = await service.updateAnnouncement(1, dto);

    //Then
    expect(result).toEqual(updated);
    expect(repoMock.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete an announcement', async () => {
    //Given
    repoMock.delete.mockResolvedValue(undefined);

    //When
    await service.deleteAnnouncement(1);

    //Then
    expect(repoMock.delete).toHaveBeenCalledWith(1);
  });

});