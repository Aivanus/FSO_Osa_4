import React from 'react'
import { connect } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { notify } from './reducers/notificationReducer'

import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
      // message: '',
      // status: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleLogoutPress = (event) => {
    window.localStorage.removeItem('loggedUser')
    this.setState({ user: null })
    this.setNotification(`Logged out`, 'success')
  }

  handleTextFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  setNotification = (message, status) => {
    this.props.notify(message, status)
  }

  createBlogEntry = async (event) => {
    event.preventDefault()
    this.loggedInView.toggleVisibility()
    try {
      const createdBlog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })
      this.setState({
        title: '',
        author: '',
        url: '',
        blogs: this.state.blogs.concat(createdBlog)
      })
      this.props.notify(`A new blog ${createdBlog.title} by ${createdBlog.author} created`, 'success')
    } catch (exeption) {
      console.log(exeption)
      this.props.notify('Blog entry not created', 'error')
    }
  }

  updateLikes = (id) => {
    console.log('update')
    this.setState({ blogs: this.state.blogs })
  }

  deleteBlog = (id) => {
    this.setState({ blogs: this.state.blogs.filter(b => b._id !== id) })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
      this.props.notify('Logged in', 'success')
    } catch (exeption) {
      this.props.notify('Invalid username or password', 'error')
    }
  }

  render() {

    const loggedInView = () => {
      return (
        <div>
          <h2>Blogs</h2>
          <div>
            {this.state.user.name} is logged in
          <button onClick={this.handleLogoutPress}>logout</button>
          </div>
          <Togglable buttonLabel={'add blog'} ref={component => this.loggedInView = component}>
            <BlogForm
              handleSubmit={this.createBlogEntry}
              handleChange={this.handleTextFieldChange}
              title={this.state.title}
              author={this.state.author}
              url={this.state.url}
            />
          </Togglable>
          {this.state.blogs.sort((a, b) => a.likes < b.likes).map(blog =>
            <Blog
              key={blog._id}
              blog={blog}
              username={this.state.user.username}
              updateLikes={this.updateLikes}
              deleteBlog={this.deleteBlog}
              setNotification={this.setNotification}
            />
          )}
        </div>
      )
    }

    return (

      <div>
        <Notification />
        {this.state.user === null ?
          (<LoginForm
            username={this.state.username}
            password={this.state.password}
            handleChange={this.handleTextFieldChange}
            handleSubmit={this.login}
          />) :
          loggedInView()
        }
      </div>
    )
  }
}

// export default App;

// const mapStateToProps = (state) => {
//   return {
//     message: state.notification.message,
//     status: state.notification.status
//   }
// }

export default connect(null, { notify })(App)
