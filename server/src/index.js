require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const MoviesAPI = require('./datasources/movie');
const SampleDatasource = require('./datasources/sampleDatasource');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        moviesAPI: new MoviesAPI(),
        sampleDatasource: new SampleDatasource(),
    }),
    context: () => {
        return {
            api_key: process.env.MOVIE_API_KEY,
        };
    },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
