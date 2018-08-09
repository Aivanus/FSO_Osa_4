const Blog = require('../models/blog')
const User = require('../models/user')

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(Blog.format)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users
}

intitializeDb = async (initialBlogs) => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(b => new Blog(b))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
}

module.exports = {
  blogsInDb,
  intitializeDb,
  usersInDb
}