const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const api = supertest(app);
const config = require('../utils/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.listWithBlogs);

  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('secret', 10);
  const user = new User({ username: 'testing', passwordHash });
  await user.save();
  const userForToken = { username: user.username, id: user.id };
  token = jwt.sign(userForToken, config.SECRET);
}, 100000);

describe('when there are some notes saved initially', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.listWithBlogs.length);
  });

  test('id field exists', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });
});

describe('when adding a new blog', () => {
  test('suceeds with valid response and data', async () => {
    const newBlog = {
      title: 'This is a new blog sent by POST',
      author: 'VS',
      url: 'would go here',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsInDb = await helper.blogsInDb();
    const titles = blogsInDb.map((blog) => blog.title);

    expect(blogsInDb).toHaveLength(helper.listWithBlogs.length + 1);
    expect(titles).toContain(newBlog.title);
  });

  test('if likes is missing, defaults to 0', async () => {
    const newBlog = {
      title: 'This is a new blog sent by POST',
      author: 'VS',
      url: 'would go here',
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsInDb = await helper.blogsInDb();
    const addedBlog = blogsInDb.find((b) => b.title === newBlog.title);
    expect(addedBlog.likes).toBe(0);
  });

  test('if title or url are missing, returns error', async () => {
    const newBlog = {
      title: 'This is a new blog sent by POST',
      author: 'VS',
    };

    const result = await api.post('/api/blogs').send(newBlog).expect(400);
    expect(result.body.error).toBe('missing fields');
  });

  test('if token is missing, return error', async () => {
    const newBlog = {
      title: 'This is a new blog sent by POST',
      author: 'VS',
      url: 'would go here',
      likes: 5,
    };

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toBe('invalid token');
  });
});

describe('deleting a blog', () => {
  test('succeeds if id is valid', async () => {
    const newBlog = {
      title: 'This is getting deleted',
      author: 'VS',
      url: 'would go here',
      likes: 5,
    };
    const response = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog);
    const blogToDelete = response.body;

    const blogsAtStart = await helper.blogsInDb();

    await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization', `Bearer ${token}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map((b) => b.title);

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating a blog', () => {
  test('succeeds if request is valid', async () => {
    const newBlog = {
      title: 'This is getting updated',
      author: 'VS',
      url: 'would go here',
      likes: 5,
    };
    const response = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog);
    const blogToUpdate = { ...response.body, likes: response.body.likes + 10 };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find((b) => b.id === blogToUpdate.id);

    expect(updatedBlog.likes).toBe(blogToUpdate.likes);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
