import { AnnouncementsController } from "./announcements.controller";
import { AnnouncementModel } from "./announcements.model";
import { AnnouncementsService } from "./announcements.service";
import { CreateAnnouncementDto, UpdateAnnouncementDto } from "./announcements.types";

const mockAnnouncementsRepository = () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('AnnouncementsController', () => {
  let announcementsController: AnnouncementsController;
  let announcementsService: AnnouncementsService;
  let repoMock: ReturnType<typeof mockAnnouncementsRepository>;

  beforeEach(() => {
    repoMock = mockAnnouncementsRepository();
    announcementsService = new AnnouncementsService(repoMock as any);
    announcementsController = new AnnouncementsController(announcementsService);
  });

  it('should return all announcements', async () => {
    //Given
    const mockData: AnnouncementModel[] = [
      new AnnouncementModel(1, new Date(), 'url', true, 1, 1, new Date(), new Date()),
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
    const mockData: AnnouncementModel = new AnnouncementModel(1, new Date(), 'url', true, 1, 1, new Date(), new Date())
    repoMock.findById.mockResolvedValue(mockData)
    
    // When
    const result = await announcementsController.getOne('1')
    
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
    const result = await announcementsController.create(dto);

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