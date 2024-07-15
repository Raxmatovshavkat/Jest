import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './interface/todo.interface';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a todo', async () => {
    const createTodoDto: CreateTodoDto = { title: 'Test Todo', description: 'Test Description', completed: false };
    const todo: Todo = { ...createTodoDto, _id: '1' } as Todo;

    jest.spyOn(service, 'create').mockResolvedValue(todo);

    expect(await controller.create(createTodoDto)).toEqual(todo);
  });

  it('should return all todos', async () => {
    const todos: Todo[] = [{ title: 'Test Todo', description: 'Test Description', completed: false }] as Todo[];

    jest.spyOn(service, 'findAll').mockResolvedValue(todos);

    expect(await controller.findAll()).toEqual(todos);
  });

  it('should return a todo by id', async () => {
    const todo: Todo = { title: 'Test Todo', description: 'Test Description', completed: false } as Todo;

    jest.spyOn(service, 'findOne').mockResolvedValue(todo);

    expect(await controller.findOne('1')).toEqual(todo);
  });

  it('should update a todo', async () => {
    const updateTodoDto: CreateTodoDto = { title: 'Updated Todo', description: 'Updated Description', completed: true };
    const updatedTodo: Todo = { ...updateTodoDto, _id: '1' } as Todo;

    jest.spyOn(service, 'update').mockResolvedValue(updatedTodo);

    expect(await controller.update('1', updateTodoDto)).toEqual(updatedTodo);
  });

  it('should delete a todo', async () => {
    const todo: Todo = { title: 'Test Todo', description: 'Test Description', completed: false } as Todo;

    jest.spyOn(service, 'remove').mockResolvedValue(todo);

    expect(await controller.remove('1')).toEqual(todo);
  });
});
