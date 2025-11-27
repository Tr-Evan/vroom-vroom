import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarModel } from './cars.model';
import { CreateCarDto, UpdateCarDto } from './cars.type';
import { CarsRepository } from './cars.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';

describe('CarsController', () => {
  let carsController: CarsController;
  let service: CarsService;
  let repoMock: jest.Mocked<CarsRepository>;

  const mockCarsRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    findByUserId: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [CarsController],
        providers: [
          CarsService,
          {
            provide: CarsRepository,
            useValue: mockCarsRepository,
          },
        ],
      }).compile();
  
      carsController = module.get<CarsController>(CarsController);
      service = module.get<CarsService>(CarsService);
      repoMock = module.get(CarsRepository);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return all cars', async () => {
        //Given
        const mockData: CarModel[] = [
          new CarModel(1, "A45 AMG", "Mercedes", "380", 1, 5, [], new Date(),new Date()),
        ];
        repoMock.findAll.mockResolvedValue(mockData);
    
        //When
        const result = await carsController.getAll();
    
        //Then
        expect(result).toEqual(mockData);
        expect(repoMock.findAll).toHaveBeenCalled();
    });

    it('should find one car', async () => {
        //Given
        const mockData: CarModel= new CarModel(2, "M3 E46 GTR", "BMW", "346", 1, 5, [], new Date(),new Date())
        
        repoMock.findById.mockResolvedValue(mockData);
    
        //When
        const result = await carsController.getById("2");
    
        //Then
        expect(result).toEqual(mockData);
        expect(repoMock.findById).toHaveBeenCalled();
    });
  
    it('should find one car by user', async () => {
        // Given
        const mockData: CarModel[] = [
            new CarModel(2, "M3 E46 GTR", "BMW", "346", 2, 5, [], new Date(), new Date())
        ];

        repoMock.findByUserId.mockResolvedValue(mockData);

        // When
        const result = await carsController.getByUserId("2");

        // Then
        expect(result).toEqual(mockData);
        expect(repoMock.findByUserId).toHaveBeenCalledWith(2);
    });

})