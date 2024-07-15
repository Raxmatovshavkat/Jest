import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let userModel: any;

  beforeEach(async () => {
    userModel = {
      find: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userDto = { username: 'test', password: 'test' };
      userModel.create.mockResolvedValue(userDto);
      expect(await service.create(userDto)).toEqual(userDto);
      expect(userModel.create).toHaveBeenCalledWith(userDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [{ username: 'test', password: 'test' }];
      userModel.find.mockResolvedValue(result);
      expect(await service.findAll()).toEqual(result);
      expect(userModel.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = { username: 'test', password: 'test' };
      userModel.findById.mockResolvedValue(user);
      expect(await service.findOne('1')).toEqual(user);
      expect(userModel.findById).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user = { username: 'test', password: 'test' };
      userModel.findByIdAndUpdate.mockResolvedValue(user);
      expect(await service.update('1', user)).toEqual(user);
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith('1', user, { new: true });
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const user = { username: 'test', password: 'test' };
      userModel.findByIdAndDelete.mockResolvedValue(user);
      expect(await service.remove('1')).toEqual(user);
      expect(userModel.findByIdAndDelete).toHaveBeenCalledWith('1');
    });
  });
});
