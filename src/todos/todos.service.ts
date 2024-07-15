import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, TodoDocument } from './interface/todo.interface';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private readonly todoModel: Model<TodoDocument>) { }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoDto);
    return await createdTodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const existingTodo = await this.todoModel.findByIdAndUpdate(id, updateTodoDto, { new: true }).exec();
    if (!existingTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return existingTodo;
  }

  async remove(id: string): Promise<Todo> {
    const deletedTodo = await this.todoModel.findByIdAndDelete(id).exec();
    if (!deletedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return deletedTodo;
  }
}
