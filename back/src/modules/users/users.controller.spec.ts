import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersModel } from "./users.model";
import { UsersRepository } from "./users.repository";
import { UsersService } from "./users.service";
import { CreateUserDto, UpdateUserDto } from "./users.types";

describe('UsersController', () => {
    let userController: UsersController;
    let service: UsersService;
    let repoMock: jest.Mocked<UsersRepository>;

    const mockUsersRepository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          controllers: [UsersController],
          providers: [
            UsersService,
            {
              provide: UsersRepository,
              useValue: mockUsersRepository,
            },
          ],
        }).compile();
    
        userController = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
        repoMock = module.get(UsersRepository);
      });

    afterEach(() => {
        jest.clearAllMocks();
    });
    
    it('should return all users', async () => {
        //Given
        const mockData: UsersModel[] = [
          new UsersModel(1, 'user name'),
        ];
        repoMock.findAll.mockResolvedValue(mockData);
    
        //When
        const result = await userController.getAll();
    
        //Then
        expect(result).toEqual(mockData);
        expect(repoMock.findAll).toHaveBeenCalled();
    });

    it('should return one users', async ()=> {
      //Given
      const mockData: UsersModel = new UsersModel(2, 'user 2')
      repoMock.findById.mockResolvedValue(mockData)
      
      // When
      const result = await userController.getById('2')
      
      //Then
      expect(result).toEqual(mockData);
      expect(repoMock.findById).toHaveBeenCalled();
    })

    it('should create a new announcement', async () => {
      //Given
      const dto: CreateUserDto = { name: 'user create' };
      const created = new UsersModel(1, dto.name);
      repoMock.create.mockResolvedValue(created);
  
      //When
      const result = await userController.create(dto);
  
      //Then
      expect(result).toEqual(created);
      expect(repoMock.create).toHaveBeenCalledWith(dto);
    });

    it('should update an announcement', async () => {
      //Given
      const dto: UpdateUserDto = { name: 'user update' };
      const updated = new UsersModel(1, 'user update');
      repoMock.update.mockResolvedValue(updated);
      repoMock.findById.mockResolvedValue(updated);
  
      //When
      const result = await userController.update('1', dto);
      
      //Then
      expect(result).toEqual(updated);
      expect(repoMock.update).toHaveBeenCalledWith(1, dto);
    });
  
    it('should delete an announcement', async () => {
      //Given
      repoMock.delete.mockResolvedValue(undefined);
  
      //When
      await userController.delete('1');
  
      //Then
      expect(repoMock.delete).toHaveBeenCalledWith(1);
    });
});
