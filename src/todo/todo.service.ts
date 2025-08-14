import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { Not } from 'typeorm';
import { CreateTodoInput } from './DTO/inputs/create-todo-inputs';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        {id:1,description:'piedra purificadora',done:false},
        {id:2,description:'piedra purificadora',done:false},
        {id:3,description:'piedra purificadora',done:false},

    ];


    findAll(): Todo[] {
        return this.todos;
    }

    findOne(id: number): Todo {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
        return todo;
    }

    create( createTodoInput:CreateTodoInput): Todo{
        const todo = new Todo();
        todo.description = createTodoInput.description;
        todo.id = Math.max(...this.todos.map(todo => todo.id),0) +1;

        this.todos.push(todo);
        return todo;
    }
}
