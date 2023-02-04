const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const helper = require('./test_helper');
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.listWithBlogs);
});

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
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsInDb = await helper.blogsInDb();
    const titles = blogsInDb.map((blog) => blog.title);

    expect(blogsInDb).toHaveLength(helper.listWithBlogs.length + 1);
    expect(titles).toContain('This is a new blog sent by POST');
  });

  test('if likes is missing, defaults to 0', async () => {
    const newBlog = {
      title: 'This is a new blog sent by POST',
      author: 'VS',
      url: 'would go here',
    };

    await api
      .post('/api/blogs')
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

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('deleting a blog', () => {
  test('succeeds if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    const titles = blogsAtEnd.map((b) => b.title);

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);
    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating a blog', () => {
  test('succeeds if request is valid', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    blogToUpdate.likes++;

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
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
