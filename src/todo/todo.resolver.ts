import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './DTO/inputs/create-todo-inputs';
import { UpdateTodoInput } from './DTO/inputs/update-todo-inputs';
import { StatusArgs } from './DTO/args/status.args';
import { AggregationsType } from './types/agreggations.type';

@Resolver(() => Todo) //se declara para que el resolver trabaje con todo lo que tiene que ver con el TODO
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService
    ){}


    @Query(() => [Todo], { name: 'todos' })
    findAll(
        @Args() statusArgs: StatusArgs
    ): Todo[]{
        return this.todoService.findAll(statusArgs);
    }

    @Query(() => Todo, { name: 'todo' })
    findOne(
        @Args('id', { type: () => Int }) id: number
    ) {
        return this.todoService.findOne( id );
    }

    @Mutation(() => Todo, { name: 'createTodo' })
    createTodo(
        @Args('createTodoInput') createTodoInput: CreateTodoInput
    ) {
        return this.todoService.create(createTodoInput);
    }

    @Mutation(() => Todo, { name: 'updateTodo' })
    updateTodo(
      @Args('updateTodoInput') updateTodoInput: UpdateTodoInput

    ) {
        return this.todoService.update(updateTodoInput);
    }

    @Mutation(() => Boolean, { name: 'removeTodo' })
    removeTodo(
        @Args('id', { type: () => Int }) id: number
    ) {
        return this.todoService.delete(id);
    } 

    //Agregations
    @Query(()=>Int,{name:'totalTodos'})
    totalTodos(){
        return this.todoService.totaltodos;
    }

    @Query(()=> AggregationsType)
    aggregations(): AggregationsType{
        return{
            completed:this.todoService.completedtodos,
            pending:this.todoService.pendingTodos,
            total:this.todoService.totaltodos,
            totalTodosCompleted: this.todoService.totaltodos
        }
    }

}
