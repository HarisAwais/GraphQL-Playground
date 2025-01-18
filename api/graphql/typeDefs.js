// graphql/typeDefs.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    signup(username: String!, password: String!): User
    signin(username: String!, password: String!): String
    createPost(title: String!, content: String!): Post
  }
`;

module.exports = typeDefs;