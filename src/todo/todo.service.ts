import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { Not } from 'typeorm';
import { CreateTodoInput } from './DTO/inputs/create-todo-inputs';
import { UpdateTodoInput } from './DTO/inputs/update-todo-inputs';
import { todo } from 'node:test';
import { StatusArgs } from './DTO/args/status.args';

@Injectable()
export class TodoService {

    private todos: Todo[] = [
        {id:1,description:'piedra purificadora',done:false},
        {id:2,description:'piedra purificadora',done:false},
        {id:3,description:'piedra purificadora',done:false},

    ];

    get totaltodos(){
        return this.todos.length;
    }

    get pendingTodos(){
        return this.todos.filter(todo => todo.done === false).length;
    }

    get completedtodos(){
        return this.todos.filter(todo => todo.done === true).length;
    }


    findAll(statusArgs:StatusArgs): Todo[] {
        const {status} = statusArgs;
        if (status !== undefined) {
            return this.todos.filter(todo => todo.done === status);
        }
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

    update(updateTodoInput: UpdateTodoInput){
        const {id, description, done} = updateTodoInput;

        const todoToUpdate = this.findOne(id);
        if(description) todoToUpdate.description = description;
        if(done !== undefined) todoToUpdate.done = done;

        this.todos = this.todos.map(todo => {

            return (todo.id === id) ? todoToUpdate : todo;
        });
        return todoToUpdate;
    }

    delete(id:number){
        const todo = this.findOne(id);
        this.todos = this.todos.filter(todo => todo.id !== id); //retorna todoos los todos que el id es diferente
        return true; //si se elimina correctamente
    }
}
