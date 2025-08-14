import { Field, InputType, Int } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

@InputType()
export class UpdateTodoInput {

    @Field(() => Int, { description: 'The ID of the todo item' })
    @IsInt()
    @IsNotEmpty()
    id: number;

    @Field(() => String,{description: 'The description of the todo item', nullable: true}) //para graphql se le pone nullable para indicar que es opcional
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description?: string;

    @Field(() => Boolean, { description: 'Indicates if the todo item is done', nullable: true })
    @IsOptional()
    done?: boolean;
}
