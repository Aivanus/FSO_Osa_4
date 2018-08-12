import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only login form is rendered', () => {
      app.update()
      const loginComponent = app.find(LoginForm)
      expect(loginComponent.exists()).toBe(true)
      const blogComponent = app.find(Blog)
      expect(blogComponent.exists()).toBe(false)
      const blogFormComponent = app.find(BlogForm)
      expect(blogFormComponent.exists()).toBe(false)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      
      localStorage.setItem('loggedUser', JSON.stringify(user))
      
      app = mount(<App />)

    })

    it('all blogs are rendered', () => {
      app.update()
      const loginComponent = app.find(LoginForm)
      expect(loginComponent.exists()).toBe(false)
      const blogComponent = app.find(Blog)
      expect(blogComponent.exists()).toBe(true)
      expect(blogComponent.length).toEqual(blogService.blogs.length)
      const blogFormComponent = app.find(BlogForm)
      expect(blogFormComponent.exists()).toBe(true)
    })
  })
})