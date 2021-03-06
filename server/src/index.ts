require('dotenv').config()
import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import { Post } from './entities/Post';
import { User } from "./entities/User";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { UserResolver } from "./resolvers/user";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const main = async () => {
    await createConnection({
        type: 'postgres',
        database: 'reddit',
        username: process.env.DB_USERNAME_DEV,
        password: process.env.DB_PASSWORD_DEV,
        logging: true,
        synchronize: true,
        entities: [User, Post]
    })

    const app = express()

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [HelloResolver, UserResolver],
        validate: false,
      }),
    //   context: ({ req, res}): Context => ({ req, res }),
      plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
    });

    await apolloServer.start()

    apolloServer.applyMiddleware({app, cors: false})

    
	const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => console.log(`Server started on port ${PORT}${apolloServer.graphqlPath}`))
}

main().catch(error => console.log(error))