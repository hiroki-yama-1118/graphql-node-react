const graphql = require("graphql");
const Movie = require("../models/movie");
const Director = require("../models/director");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

//オブジェクト生成
const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return Director.findById(parent.directorId);
      },
    },
  }),
});

//映画監督の情報
const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({ directorId: parent.id });
      },
    },
  }),
});

//外部からMovieTypeのデータを取得するため
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      //argsで受け取ったデータを利用してデータを取得する
      resolve(parents, args) {
        return Movie.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        return Director.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return Movie.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return Director.find({});
      },
    },
  },
});

//データを追加するため
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    //映画を追加
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let movie = new Movie({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        });
        return movie.save();
      },
    },
    //監督情報を追加
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let director = new Director({
          name: args.name,
          age: args.age,
        });
        return director.save();
      },
    },
    //監督情報を更新
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let updateDirector = {};
        args.name && (updateDirector.name = args.name);
        args.age && (updateDirector.age = args.age);
        return Director.findByIdAndUpdate(args.id, updateDirector, {
          new: true,
        });
      },
    },
    //映画情報を更新
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
      },
      resolve(parent, args) {
        let updateMovie = {};
        args.name && (updateMovie.name = args.name);
        args.genre && (updateMovie.genre = args.genre);
        args.directorId && (updateMovie.directorId = args.directorId);
        return Movie.findByIdAndUpdate(args.id, updateMovie, {
          new: true,
        });
      },
    },
    //映画を削除
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Movie.findByIdAndRemove(args.id);
      },
    },
    //監督を削除
    deleteDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Director.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
