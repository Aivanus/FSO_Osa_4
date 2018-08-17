import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, FormField, Header, List, ListItem } from 'semantic-ui-react'
import { blogUpdate, blogRemove, blogComment } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const findBlogById = (blogs, id) => {
  return blogs.find(u => u._id.toString() === id)
}

const BlogInfo = (props) => {
  const blog = findBlogById(props.blogs, props.id)
  if (!blog) {
    return null
  }
  return (
    <div>
      <Header as="h2">{`${blog.title} by ${blog.author}`}</Header>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <Button color="green" onClick={() => {
          props.blogUpdate(blog._id, { ...blog, likes: blog.likes + 1 })
        }
        }>like</Button>
      </p>
      <p>Added by {blog.user.name}</p>
      {
        props.currentUsername === blog.user.username ?
          <Button color="red" onClick={() => {
            if (window.confirm(`Do you want to delete ${blog.title}?`)) {
              props.blogRemove(blog._id)
              props.notify(`Blog ${blog.title} is deleted!`, 'success')
            }
          }}>delete</Button>
          : null
      }
      <div>
        <Header as="h3">Comments</Header>
        <List bulleted relaxed>
          {blog.comments.length === 0 ?
            <p> No comments yet </p> :
            blog.comments.map((c, index) =>
              <ListItem key={index}>
                {c}
              </ListItem>
            )}
        </List>
        <div>
          <Form onSubmit={(event) => {
            event.preventDefault()
            const newComment = event.target.comment.value
            props.blogComment(blog._id, blog, newComment)
            props.notify(`Blog '${blog.title}' commented with '${newComment}'!`, 'success')
            event.target.comment.value = ''
          }}>
            <FormField>
              <input name="comment" />
            </FormField>
            <Button primary type="submit">add comment</Button>
          </Form>
        </div>
      </div>
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    currentUsername: state.loggedUser ? state.loggedUser.username : null,
    blogs: state.blogs
  }
}

export default connect(mapStateToProps, { blogUpdate, blogRemove, blogComment, notify })(BlogInfo)