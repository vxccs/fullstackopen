const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const mongoose = require('mongoose');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  if (!mongoose.Types.ObjectId.isValid(request.params.id)) return response.status(400).json({ error: 'invalid id' });
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  });
  if (!blog) return response.status(400).json({ error: 'id does not exist' });
  response.json(blog);
});

blogsRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!title || !url) {
    return response.status(400).json({ error: 'missing fields' });
  }

  const user = request.user;

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: user._id,
  });

  const result = await (await blog.save()).populate('user', { username: 1, name: 1 });

  user.blogs = [...user.blogs, result._id];
  await user.save();

  response.status(201).json(result);
});

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) return response.status(400).json({ error: 'invalid id' });
  const blog = await Blog.findById(id);
  if (!blog) return response.status(400).json({ error: 'id does not exist' });

  if (blog.user.toString() !== request.user.id.toString())
    return response.status(401).json({ error: 'unauthorized request' });

  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogsRouter.patch('/:id', async (request, response) => {
  const id = request.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) return response.status(400).json({ error: 'invalid id' });
  const blog = await Blog.findById(id);
  if (!blog) return response.status(400).json({ error: 'id does not exist' });

  const updatedBlog = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true }).populate('user', {
    username: 1,
    name: 1,
  });
  response.json(updatedBlog);
});

module.exports = blogsRouter;
