import { Float, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloworldResolver {


    @Query(() => String,{description: `retorna hola mundo`,name: 'helloWorld'})
    helloWorld() : string {
        return 'Hello World!';
    }

    @Query(() => Float,{description: `retorna un numero aleatorio`,name: 'number'})
    getNumber(): number {
        return Math.random() * 100;
    }
}
