const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const initialBlogs = require('./test_blogs')
const Blog = require('../models/blog')


describe('when GET is sent to api/blogs', () => {
  test('blog info list is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blog items are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('a specific blog item is within the returned', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContainEqual('Go To Statement Considered Harmful')
  })
})

describe('when POST is sent to api/blogs', () => {
  test('valid blog item is added', async () => {
    const validBlog = {
      "title": "First Blog",
      "author": "Anonymous",
      "url": "www.uuu.com",
      "likes": 9000
    }

    await api
      .post('/api/blogs')
      .send(validBlog)
      .expect(201)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(titles).toContainEqual('First Blog')
  })
})

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(b => new Blog(b))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
})

afterAll(() => {
  server.close()
})