import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  let simpleBlogComponent
  let mockHandler

  const blog = {
    title: 'Blog title',
    author: 'Author McAuthorface',
    likes: 12
  }

  beforeEach(() => {
    mockHandler = jest.fn()
    simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
  })

  it('renders title, author and likes', () => {
    const infoDiv = simpleBlogComponent.find('.info')
    const likesDiv = simpleBlogComponent.find('.likes')

    expect(infoDiv.text()).toContain(blog.title)
    expect(infoDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('clicking button calls handler', () => {
    const button = simpleBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})