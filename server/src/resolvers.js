const resolvers = {
    Query: {
        sampleData: (root, _args, { dataSources }) =>
            dataSources.sampleDatasource.sampleData(),

        movies: async (_, __, { dataSources }) => {
            const allMovies = await dataSources.moviesAPI.getNowPlayingMovies();
            return allMovies;
        },

        movie: (root, { id }, { dataSources }) => {
            return dataSources.moviesAPI.getSpecific(id);
        },
    },
};

module.exports = resolvers;
