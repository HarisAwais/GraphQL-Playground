// controllers/postController.js
// const Post = require('../models/post.models');

const postModels = require("../models/post.models");

exports.createPost = async (title, content, userId) => {
  const post = new postModels({ title, content, author: userId });
  await post.save();
  return post;
};

exports.getPosts = async () => {
  return await postModels.find().populate('author');
};