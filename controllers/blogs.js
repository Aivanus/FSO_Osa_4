const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (exeption) {
    console.log(exeption)
    response.status(500).send({ error: 'something went wrong' })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).send({ error: 'title and url are required' })
    }
    if (blog.likes === undefined) {
      blog.likes = 0
    }
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }catch(exeption){
    console.log(exeption)
    rspnonse.status(500).send({error: 'something went wrong during posting'})
  }
})

module.exports = blogsRouter