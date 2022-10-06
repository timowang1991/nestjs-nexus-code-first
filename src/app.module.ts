import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { NexusModule } from './nexus/nexus.module';
import { mergeSchemas } from '@graphql-tools/schema';
import { nexusSchemaPromise } from './nexus/nexus.model';
import { GraphQLSchema } from 'graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      transformSchema: async (schema) => {
        const nexusSchema = (await nexusSchemaPromise) as GraphQLSchema;

        return mergeSchemas({
          schemas: [schema, nexusSchema],
        });
      },
    }),
    HelloWorldModule,
    NexusModule,
  ],
})
export class AppModule {}
