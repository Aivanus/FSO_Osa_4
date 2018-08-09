const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const initialBlogs = require('./test_blogs')
const helper = require('./test_helper')
const Blog = require('../models/blog')


describe('when GET is sent to api/blogs', () => {
  beforeAll(async () => {
    await helper.intitializeDb(initialBlogs)
  })

  test('blog info list is returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blog items are returned', async () => {
    const response = await helper.blogsInDb()
    //dependency
    expect(response.length).toBe(initialBlogs.length)
  })

  test('a specific blog item is within the returned', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContainEqual('Go To Statement Considered Harmful')
  })
})

describe('when POST is sent to api/blogs', () => {
  beforeAll(async () => {
    await helper.intitializeDb(initialBlogs)
  })

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
      .expect('Content-Type', /application\/json/)

    const blogsAfterPosting = await helper.blogsInDb()

    expect(blogsAfterPosting.length).toBe(initialBlogs.length + 1)
    expect(blogsAfterPosting).toContainEqual(validBlog)
  })

  test('and if likes arent provided it has zero likes', async () => {
    const noLikesBlog = {
      "title": "First Blog",
      "author": "Anonymous",
      "url": "www.uuu.com"
    }

    const addedBlog = await api
      .post('/api/blogs')
      .send(noLikesBlog)
      .expect(201)

    expect(addedBlog.body.likes).toBe(0)
  })

  test('item without title is not added', async () => {
    const noLikesBlog = {
      "author": "Anonymous",
      "url": "www.uuu.com",
      "likes": 0
    }

    const blogsBeforePosting = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(noLikesBlog)
      .expect(400)

    const blogsAfterPosting = await helper.blogsInDb()

    expect(blogsBeforePosting.length).toBe(blogsAfterPosting.length)
  })

  test('item without url is not added', async () => {
    const noLikesBlog = {
      "title": "First Blog",
      "author": "Anonymous",
      "likes": 0
    }

    const blogsBeforePosting = await await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(noLikesBlog)
      .expect(400)

    const blogsAfterPosting = await await helper.blogsInDb()

    expect(blogsBeforePosting.length).toBe(blogsAfterPosting.length)
  })
})

describe('when DELETE request is sent to api/blogs', () => {
  let blogToDelete
  beforeAll(async () => {
    await helper.intitializeDb(initialBlogs)

    blogToDelete = new Blog({
      "title": "To delete",
      "author": "Anon",
      "url": "www.delete.com",
      "likes": 7
    })

    await blogToDelete.save()
  })

  test('item with a valid id is deleted', async () => {
    const blogsBeforeDelete = await helper.blogsInDb()

    await api
      .delete('/api/blogs/' + blogToDelete._id)
      .expect(204)

    const blogsAfterDelete = await helper.blogsInDb()

    expect(blogsAfterDelete.length).toBe(blogsBeforeDelete.length - 1)
    expect(blogsAfterDelete).not.toContainEqual(blogToDelete)
  })

  test('and incorrect id is provided nothing is deleted', async () => {
    const blogsBeforeDelete = await helper.blogsInDb()

    await api
      .delete('/api/blogs/77')
      .expect(400)

    const blogsAfterDelete = await helper.blogsInDb()

    expect(blogsAfterDelete.length).toBe(blogsBeforeDelete.length)
  })
})

describe('when PUT request is sent api/blogs', () => {
  let blogToUpdate
  beforeAll(async () => {
    await helper.intitializeDb(initialBlogs)

    blogToUpdate = new Blog({
      "title": "To update",
      "author": "Anony",
      "url": "www.update.com",
      "likes": 77
    })

    await blogToUpdate.save()
  })

  test('item with a valid id updated accordingly', async () => {
    const blogsBeforeUpdate = await helper.blogsInDb()
    console.log(blogToUpdate)
    const updatedBlog = await api
      .put('/api/blogs/' + blogToUpdate._id)
      .send({
        title: "To updated",
        author: "Anonym",
        url: "www.updated.com",
        likes: 9001
      })
      .expect(200)

    const blogsAfterUpdate = await helper.blogsInDb()

    expect(blogsAfterUpdate.length).toBe(blogsBeforeUpdate.length)
    expect(blogsAfterUpdate).toContainEqual(Blog.format(updatedBlog.body))
  })

  test('and incorrect id is provided nothing is updated', async () => {
    const blogsBeforeUpdate = await helper.blogsInDb()
    await api
      .put('/api/blogs/77')
      .send({
        title: "To updated",
        author: "Anonym",
        url: "www.updated.com",
        likes: 9001
      })
      .expect(400)

    const blogsAfterUpdate = await helper.blogsInDb()

    expect(blogsAfterUpdate).toEqual(blogsBeforeUpdate)
  })
})

afterAll(() => {
  server.close()
})