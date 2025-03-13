import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema/typeDefs";
import { userResolvers } from "./resolvers/userResolver";
import { expenseResolvers } from "./resolvers/expenseResolver";
import { categoryResolvers } from "./resolvers/categoryResolver";

const resolvers = {
    Query: {
        ...userResolvers.Query,
        ...expenseResolvers.Query,
        ...categoryResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...expenseResolvers.Mutation,
        ...categoryResolvers.Mutation,
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`);
});
