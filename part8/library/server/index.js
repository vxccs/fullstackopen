const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const config = require('./config');
const Book = require('./models/Book');
const Author = require('./models/Author');
const { GraphQLError } = require('graphql');

mongoose.set('strictQuery', false);

console.log('connecting to', config.MONGO_URI);
mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log('connected to mongodb'))
  .catch((e) => console.log('unable to connect to mongodb:', e.message));

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]!
    allAuthors: [Author]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      return Book.collection.countDocuments({ author: author._id });
    },
  },

  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: async (root, args) => {
      let allBooks = await Book.find({}).populate('author');
      if (args.author) {
        allBooks = allBooks.filter((b) => b.author.name === args.author);
      }
      if (args.genre) {
        allBooks = allBooks.filter((b) => b.genres.includes(args.genre));
      }
      return allBooks;
    },

    allAuthors: async () => await Author.find({}),
  },

  Mutation: {
    addBook: async (root, args) => {
      const book = await Book.findOne({ title: args.title });
      if (book) {
        throw new GraphQLError('book already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          },
        });
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author, born: null });
        await author.save();
      }

      const newBook = new Book({ ...args, author });
      return newBook.save();
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });

      if (!author) {
        throw new GraphQLError('author does not exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
          },
        });
      }

      author.born = args.setBornTo;
      return author.save();
    },
  },
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
