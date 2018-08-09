const Blog = require('../models/blog')

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(Blog.format)
}

intitializeDb = async (initialBlogs) => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(b => new Blog(b))
  const promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
}

module.exports = {
  blogsInDb,
  intitializeDb
}