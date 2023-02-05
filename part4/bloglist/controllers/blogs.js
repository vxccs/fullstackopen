const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const mongoose = require('mongoose');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) return response.status(400).json({ error: 'invalid id' });
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 });
  if (!blog) return response.status(400).json({ error: 'id does not exist' });
  response.json(blog);
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: 'missing fields' });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(request.token, config.SECRET);
    if (!decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' });
  } catch (error) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const user = request.user;

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  });

  const result = await blog.save();
  user.blogs = [...user.blogs, result._id];
  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(request.token, config.SECRET);
    if (!decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' });
  } catch (error) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const id = request.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) return response.status(400).json({ error: 'invalid id' });
  const blog = await Blog.findById(id);
  if (!blog) return response.status(400).json({ error: 'id does not exist' });

  if (blog.user.toString() !== request.user.id.toString())
    return response.status(401).json({ error: 'unauthorized request' });

  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  let decodedToken;
  try {
    decodedToken = jwt.verify(request.token, config.SECRET);
    if (!decodedToken.id) return response.status(401).json({ error: 'token missing or invalid' });
  } catch (error) {
    return response.status(401).json({ error: 'invalid token' });
  }

  const id = request.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) return response.status(400).json({ error: 'invalid id' });
  const blog = await Blog.findById(id);
  if (!blog) return response.status(400).json({ error: 'id does not exist' });

  if (blog.user.toString() !== request.user.id.toString())
    return response.status(401).json({ error: 'unauthorized request' });

  const { title, author, url, likes } = request.body;

  const newBlog = { title, author, url, likes };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
