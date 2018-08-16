import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Menu as SemMenu } from 'semantic-ui-react'

// import Blog from './components/Blog'
import BlogList from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import UserList from './components/User'

import { notify } from './reducers/notificationReducer'
import { setUser, clearUser } from './reducers/loggedUserReducer'
import { blogInit, blogCreate, blogRemove } from './reducers/blogReducer'
import { initUsers } from './reducers/usersReducer'

import blogService from './services/blogs'
import loginService from './services/login'

const Menu = () => (
  <SemMenu inverted>
    <SemMenu.Item link>
      <NavLink exact to="/blogs">blogs</NavLink>&nbsp;
    </SemMenu.Item>
    <SemMenu.Item link>
      <NavLink exact to="/users">users</NavLink>&nbsp;
    </SemMenu.Item>
  </SemMenu>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      title: '',
      author: '',
      url: ''
    }
  }

  componentDidMount() {
    console.log('App mount')
    this.props.initUsers()
    this.props.blogInit()
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      // move to loggedUserReducer
      const user = JSON.parse(loggedUserJSON)
      this.props.setUser(user)
      blogService.setToken(user.token)
    }
  }

  handleLogoutPress = (event) => {
    window.localStorage.removeItem('loggedUser')
    this.props.clearUser()
    this.props.notify(`Logged out`, 'success')
  }

  handleTextFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  createBlogEntry = async (event) => {
    event.preventDefault()
    this.loggedInView.toggleVisibility()
    try {
      const blogToCreate = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url,
        user: this.props.loggedUser
      }
      this.props.blogCreate(blogToCreate)

      this.setState({
        title: '',
        author: '',
        url: ''
      })
      this.props.notify(`A new blog ${blogToCreate.title} by ${blogToCreate.author} created`, 'success')
    } catch (exeption) {
      console.log(exeption)
      this.props.notify('Blog entry not created', 'error')
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      this.props.blogInit()
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '' })
      this.props.setUser(user)
      this.props.notify('Logged in', 'success')
    } catch (exeption) {
      this.props.notify('Invalid username or password', 'error')
    }
  }

  render() {
    const loggedInView = () => {
      return (
        <div>
          <div>
            {this.props.loggedUser.name} is logged in
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
        </div>
      )
    }

    return (
      <Container>
        <div>
          <Router>
            <div>
              <Menu />
              <Notification />
              {this.props.loggedUser === null ?
                (<LoginForm
                  username={this.state.username}
                  password={this.state.password}
                  handleChange={this.handleTextFieldChange}
                  handleSubmit={this.login}
                />) :
                loggedInView()
              }
              {/* Need to update with redux */}
              <Route path="/users" component={UserList} />
              <Route path="/blogs" component={BlogList} />
            </div>
          </Router>
        </div>
      </Container>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // console.log('App')
  // console.log(state)
  return {
    loggedUser: state.loggedUser,
    // blogs: state.blogs.sort((a, b) => a.likes < b.likes),
    users: state.users,
    props: ownProps
  }
}

export default connect(
  mapStateToProps, {
    notify, setUser, clearUser, blogInit, blogCreate, blogRemove, initUsers
  })(App)
