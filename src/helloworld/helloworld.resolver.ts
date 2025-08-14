import { Float, Query, Resolver, Int, Args } from '@nestjs/graphql';

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

    @Query(() => Int,{description: `retorna un numero aleatorio entre 0 y el numero pasado por parametro`,name: 'getRandomFromZeroTo'})
    getRandomFromZeroTo(@Args('to', { nullable:true, type: () => Int }) to:number = 6): number { ///revisar que el argumento reciba correctamente el dato
        return Math.floor(Math.random() * to);
    }
}
