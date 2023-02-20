const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');

const mongoose = require('mongoose');
const config = require('./config');
const jwt = require('jsonwebtoken');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const User = require('./models/User');

const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');

mongoose.set('strictQuery', false);

console.log('connecting to', config.MONGO_URI);
mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log('connected to mongodb'))
  .catch((e) => console.log('unable to connect to mongodb:', e.message));

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(auth.substring(7), config.SECRET);
          const currentUser = await User.findById(decodedToken.id);
          return { currentUser };
        }
      },
    })
  );

  const PORT = 4000;

  httpServer.listen(PORT, () =>
    console.log(`server running on http://localhost:${PORT}`)
  );
};

start();
