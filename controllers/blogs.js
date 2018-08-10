const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog
      .find({})
      .populate('user', { _id: 1, username: 1, name: 1 })
    response.json(blogs)
  } catch (exeption) {
    console.log(exeption)
    response.status(500).send({ error: 'something went wrong' })
  }
})

blogsRouter.post('/', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog(request.body)
    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).send({ error: 'title and url are required' })
    }
    if (blog.likes === undefined) {
      blog.likes = 0
    }

    const user = await User.findById(decodedToken.id)

    blog.user = user._id
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (exeption) {
    console.log(exeption)
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong during posting' })
    }
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blogToDelete = await Blog.findById(request.params.id)

    if(decodedToken.id.toString() !== blogToDelete.user.toString()){
      return response.status(403).send({error: 'only user that created the entry can delete blog'})
    }

    const user = await User.findById(decodedToken.id)
    user.blogs = user.blogs.filter(b => b._id !== request.params.id)
    await user.save()

    await Blog
      .findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exeption) {
    console.log(exeption)
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, newBlog, { new: true })
    response.status(200).json(updatedBlog)
  } catch (exeption) {
    console.log(exeption)
    response.status(400).send({ error: 'malformatted id' })
  }
})

module.exports = blogsRouter