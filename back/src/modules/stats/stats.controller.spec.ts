import { Test, TestingModule } from "@nestjs/testing";
import { StatsController } from "./stats.controller";
import { StatsModel } from "./stats.model";
import { StatsRepository } from "./stats.repository";
import { StatsService } from "./stats.service";
import { CreateStatsDto, UpdateStatsDto } from "./stats.type";

describe('StatsController', () => {
  let statsController: StatsController;
  let service: StatsService;
  let repoMock: jest.Mocked<StatsRepository>;

  const mockStatsRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [
        StatsService,
        {
          provide: StatsRepository,
          useValue: mockStatsRepository,
        },
      ],
    }).compile();

    statsController = module.get<StatsController>(StatsController);
    service = module.get<StatsService>(StatsService);
    repoMock = module.get(StatsRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all stats', async () => {
    // Given
    const mockData: StatsModel[] = [
      new StatsModel(1, 150, 2500),
    ];
    repoMock.findAll.mockResolvedValue(mockData);

    // When
    const result = await statsController.getAll();

    // Then
    expect(result).toEqual(mockData);
    expect(repoMock.findAll).toHaveBeenCalled();
  });

  it('should return one stat', async () => {
    // Given
    const mockData: StatsModel = new StatsModel(1, 150, 2500);
    repoMock.findById.mockResolvedValue(mockData);
    
    // When
    const result = await statsController.getById('1');
    
    // Then
    expect(result).toEqual(mockData);
    expect(repoMock.findById).toHaveBeenCalledWith(1);
  });

  it('should create new stats', async () => {
    // Given
    const dto: CreateStatsDto = { favoris: 10, view: 120 };
    const created = new StatsModel(1, 0, 0);
    repoMock.create.mockResolvedValue(created);

    // When
    const result = await statsController.create(dto);

    // Then
    expect(result).toEqual(created);
    expect(repoMock.create).toHaveBeenCalledWith(dto);
  });

  it('should update stats', async () => {
    // Given
    const dto: UpdateStatsDto = { favoris: 1, view: 100 };
    const updated = new StatsModel(1, 1, 1);
    repoMock.update.mockResolvedValue(updated);
    repoMock.findById.mockResolvedValue(updated);

    // When
    const result = await statsController.update('1', dto);

    // Then
    expect(result).toEqual(updated);
    expect(repoMock.update).toHaveBeenCalledWith(1, dto);
  });

  it('should delete stats', async () => {
    // Given
    repoMock.delete.mockResolvedValue(undefined);

    // When
    await statsController.delete('1');

    // Then
    expect(repoMock.delete).toHaveBeenCalledWith(1);
  });

});