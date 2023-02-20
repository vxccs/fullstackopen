const Book = require('./models/Book');
const Author = require('./models/Author');
const { GraphQLError } = require('graphql');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const config = require('./config');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
  Author: {
    bookCount: async (root) =>
      (await Author.findOne({ name: root.name })).books.length,
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

    me: (root, args, context) => context.currentUser,
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const book = await Book.findOne({ title: args.title });
      if (book) {
        throw new GraphQLError('book already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({ name: args.author, born: null });
        await author.save();
      }

      if (args.published === 0) {
        throw new GraphQLError('invalid publish date', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const newBook = new Book({ ...args, author });
      await newBook.save();

      author.books = [...author.books, newBook._id];
      await author.save();

      pubsub.publish('BOOK_ADDED', { bookAdded: newBook });

      return newBook;
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const author = await Author.findOne({ name: args.name });

      if (!author) {
        throw new GraphQLError('author does not exist', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      if (args.setBornTo === 0) {
        throw new GraphQLError('invalid birth date', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      author.born = args.setBornTo;
      return author.save();
    },

    createUser: async (root, args) => {
      const userExists = await User.findOne({ username: args.username });
      if (userExists) {
        throw new GraphQLError('user already exists', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
      });
      return user.save();
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = { username: user.username, id: user._id };

      return { value: jwt.sign(userForToken, config.SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;
