const { gql } = require('apollo-server');
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
    type Genre {
        id: ID
        name: String!
    }
    type Movie {
        id: ID!
        title: String!
        poster_path: String
        genres: [Genre]
        overview: String
    }

    type Query {
        movies: [Movie]
        movie(id: ID!): Movie
        sampleData: SampleData
    }

    type SampleData {
        data: String!
    }
`;

module.exports = typeDefs;
