// index.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./api/graphql/typeDefs');
const resolvers = require('./api/graphql/resolver');

mongoose.connect('mongodb://localhost:27017/graphql', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    let user = null;
    if (token) {
      try {
        user = jwt.verify(token, 'your_secret_key');
      } catch (error) {
        throw new Error('Invalid token');
      }
    }
    return { user };
  },
});

(async () => {
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}${server.graphqlPath}`);
  });
})();