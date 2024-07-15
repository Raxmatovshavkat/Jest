import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TodosService } from './todos.service';
import { Todo } from './interface/todo.interface';
import mongoose, { Model } from 'mongoose';

describe('TodosService', () => {
  let service: TodosService;
  let model: Model<Todo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getModelToken('Todo'),
          useValue: {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    model = module.get<Model<Todo>>(getModelToken('Todo'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should return all todos', async () => {
    const todos = [{ title: 'test', description: 'test', completed: false, _id: new mongoose.Types.ObjectId() }] as Todo[];
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(todos),
    } as any);
    expect(await service.findAll()).toEqual(todos);
  });

  it('should return a todo by id', async () => {
    const todo = { title: 'test', description: 'test', completed: false, _id: new mongoose.Types.ObjectId() } as Todo;
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(todo),
    } as any);
    expect(await service.findOne(todo._id.toString())).toEqual(todo);
  });

  it('should update a todo', async () => {
    const updateTodoDto = { title: 'updated title' } as Partial<Todo>;
    const todo = { ...updateTodoDto, description: 'test', completed: false, _id: new mongoose.Types.ObjectId() } as Todo;
    jest.spyOn(model, 'findByIdAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(todo),
    } as any);
    expect(await service.update(todo._id.toString(), updateTodoDto)).toEqual(todo);
  });

  it('should delete a todo', async () => {
    const todo = { title: 'test', description: 'test', completed: false, _id: new mongoose.Types.ObjectId() } as Todo;
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(todo),
    } as any);
    expect(await service.remove(todo._id.toString())).toEqual(todo);
  });
});
