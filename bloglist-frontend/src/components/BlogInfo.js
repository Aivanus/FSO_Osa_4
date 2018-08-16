import React from 'react'
import { connect } from 'react-redux'
import { blogUpdate, blogRemove } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const findBlogById = (blogs, id) => {
  return blogs.find(u => u._id.toString() === id)
}

const BlogInfo = (props) => {
  const blog = findBlogById(props.blogs, props.id)
  // console.log('blog')
  // console.log(blog)
  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>{`${blog.title} by ${blog.author}`}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button onClick={() => {
          props.blogUpdate(blog._id, { ...blog, likes: blog.likes + 1 })
        }
        }>like</button>
      </p>
      <p>Added by {blog.user.name}</p>
      {
        props.currentUsername === blog.user.username ?
          <button onClick={() => {
            if (window.confirm(`Do you want to delete ${blog.title}?`)) {
              props.blogRemove(blog._id)
              props.notify(`Blog ${blog.title} is deleted!`, 'success')
            }
          }}>delete</button>
          : null
      }
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    currentUsername: state.loggedUser ? state.loggedUser.username : null,
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { blogUpdate, blogRemove, notify })(BlogInfo)