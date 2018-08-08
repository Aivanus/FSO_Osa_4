const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, current) => {
    return sum + current.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if(!(blogs && blogs.length)){
    return null
  }

  const fav = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })

  return {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  }
}

const mostBlogs = (blogs) => {
  if(!(blogs && blogs.length)){
    return null
  }

  const blogCounts = blogs.reduce((counts, current) => {
    if (current.author in counts) {
      counts[current.author]++
    } else {
      counts[current.author] = 1
    }
    return counts
  }, {})

  const topBlogger = Object.keys(blogCounts).reduce((prev, current) =>{
    return (blogCounts[prev] > blogCounts[current]) ? prev : current
  })

  return {
    author: topBlogger,
    blogs: blogCounts[topBlogger]
  }
}

const mostLikes = (blogs) => {
  if(!(blogs && blogs.length)){
    return null
  }

  const likeCounts = blogs.reduce((counts, current) => {
    if (current.author in counts) {
      counts[current.author] += current.likes
    } else {
      counts[current.author] = current.likes
    }
    return counts
  }, {})

  const topBlogger = Object.keys(likeCounts).reduce((prev, current) =>{
    return (likeCounts[prev] > likeCounts[current]) ? prev : current
  })

  return {
    author: topBlogger,
    likes: likeCounts[topBlogger]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}