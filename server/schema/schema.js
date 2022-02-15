const graphql = require("graphql");
const Movie = require("../models/movie");

const { GraphQLObjectType, GraphQLID, GraphQLString } = graphql;

//オブジェクト生成
const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

//外部からMovieTypeのデータを取得するため
const RootQuery = new GraphQLObjectType({
  name: "RoorQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLString } },
      //argsで受け取ったデータを利用してデータを取得する
      resolve(parents, args) {
        return Movie.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
