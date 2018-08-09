const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = require('./test_blogs')

describe('list helpers', () => {
  // tests of function dummy
  test('dummy is called', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

  // tests of function totalLikes
  describe('total likes', () => {

    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('when list has multiple blogs equals to sum of likes', () => {
      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(36)
    })

    test('when list has no blogs total likes are zero', () => {
      const result = listHelper.totalLikes([])
      expect(result).toBe(0)
    })
  })

  // test function favoriteBlog
  describe('favorite blog', () => {

    test('of list with one blog is the blog itself', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      expect(result).toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
    })

    test('of list with many blogs is the most liked blog', () => {
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      })
    })

    test('of empty list is null', () => {
      const result = listHelper.favoriteBlog([])
      expect(result).toEqual(null)
    })

  })

  // test function mostBlogs
  describe('author with most blogs', () => {
    test('of a list with one blog is the only author', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        blogs: 1
      })
    })

    test('of a list with one multiple blogs an authors is correct', () => {
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({
        author: "Robert C. Martin",
        blogs: 3
      })
    })

    test('of an empty list is null', () => {
      const result = listHelper.mostBlogs([])
      expect(result).toEqual(null)
    })
  })

  // test function mostLikes
  describe('author with most likes', () => {
    test('of a list with one blog is the only author', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
    })

    test('of a list with one multiple likes an authors is correct', () => {
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 17
      })
    })

    test('of an empty list is null', () => {
      const result = listHelper.mostLikes([])
      expect(result).toEqual(null)
    })
  })
})
