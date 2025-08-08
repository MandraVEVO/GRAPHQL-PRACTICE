import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { HelloworldModule } from './helloworld/helloworld.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
driver: ApolloDriver,
autoSchemaFile: join( process.cwd(), 'src/schema.gql'),
// debug: false,
playground: false,

plugins: [
  ApolloServerPluginLandingPageLocalDefault()
]
}),
    HelloworldModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
