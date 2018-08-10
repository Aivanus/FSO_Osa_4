const blogsRouter = require('express').Router()
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
    const blog = new Blog(request.body)
    if (blog.title === undefined || blog.url === undefined) {
      return response.status(400).send({ error: 'title and url are required' })
    }
    if (blog.likes === undefined) {
      blog.likes = 0
    }

    let user = await User.find({})
    user = user[0]

    blog.user = user._id
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (exeption) {
    console.log(exeption)
    response.status(500).send({ error: 'something went wrong during posting' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
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