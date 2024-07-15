import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            findById: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockResolvedValue({}),
            findByIdAndUpdate: jest.fn().mockResolvedValue(null),
            findByIdAndDelete: jest.fn().mockResolvedValue(null),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    userModel = module.get(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = { username: 'test', password: 'test' };
      const result = await userController.create(createUserDto);
      expect(result).toEqual({});
      expect(userService.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await userController.findAll();
      expect(result).toEqual([]);
      expect(userService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const result = await userController.findOne('1');
      expect(result).toEqual(null);
      expect(userService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { username: 'updatedUser' };
      const result = await userController.update('1', updateUserDto);
      expect(result).toEqual(null);
      expect(userService.update).toHaveBeenCalledWith('1', updateUserDto);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const result = await userController.remove('1');
      expect(result).toEqual(null);
      expect(userService.remove).toHaveBeenCalledWith('1');
    });
  });
});
