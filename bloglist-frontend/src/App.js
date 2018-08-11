import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
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
      message: '',
      status: null
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

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogoutPress = (event) => {
    window.localStorage.removeItem('loggedUser')
    this.setState({ user: null })
    this.setNotification(`Logged out`,'success')
  }

  handleTextFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  setNotification = (message, status) => {
    this.setState({
      message: message,
      status: status
    })
    setTimeout(() => {
      this.setState({ message: '', status: null })
    }, 5000)
  }

  createBlogEntry = async (event) => {
    event.preventDefault()
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
      this.setNotification(`A new blog ${createdBlog.title} by ${createdBlog.author} created`,'success')
    } catch (exeption) {
      console.log(exeption)
      this.setNotification('Blog entry not created','error')
    }
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
      this.setNotification('Logged in','success')
    } catch (exeption) {
      this.setNotification('Invalid username or password','error')
    }
  }

  render() {
    const loginForm = () => (
      <div>
        <h2>Log in to application</h2>

        <form onSubmit={this.login}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )

    const loggedInView = () => (
      <div>
        <h2>Blogs</h2>
        <div>
          {this.state.user.name} is logged in
          <button onClick={this.handleLogoutPress}>logout</button>
        </div>
        {blogForm()}
        {this.state.blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
      </div>
    )

    const blogForm = () => (
      <div>
        <h2>Create new</h2>

        <form onSubmit={this.createBlogEntry}>
          <div>
            title
          <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleTextFieldChange}
            />
          </div>
          <div>
            author
          <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleTextFieldChange}
            />
          </div>
          <div>
            url
          <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleTextFieldChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )

    return (

      <div>
        <Notification message={this.state.message} status={this.state.status} />
        {this.state.user === null ?
          loginForm() :
          loggedInView()
        }
      </div>
    )
  }
}

export default App;
