// graphql/resolvers.js
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken');
const { getPosts, createPost } = require('../controllers/post.controller');

const resolvers = {
  Query: {
    getPosts: async () => await getPosts(),
  },
  Mutation: {
    signup: async (_, { username, password }) => {
      return await authController.signup(username, password);
    },
    signin: async (_, { username, password }) => {
      return await authController.signin(username, password);
    },
    createPost: async (_, { title, content }, { user }) => {
      if (!user) throw new Error('Authentication required');
      return await createPost(title, content, user.id);
    },
  },
  Post: {
    author: async (post) => {
      return await User.findById(post.author);
    },
  },
};

module.exports = resolvers;