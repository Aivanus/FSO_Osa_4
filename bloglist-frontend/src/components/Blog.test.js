import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'
import { Z_FULL_FLUSH } from 'zlib';

describe.only('<Blog />', () => {
  let blogComponent
  let mockUpdateLikes

  const blog = {
    _id: "5b6edf05913a4e423017f913",
    author: "Me",
    likes: 21,
    title: "First Blog",
    url: "www.url.com",
    user: {
      _id: "5b6d624a58e05b2c48885829",
      name: "First User",
      username: "ChosenOne"
    },
    _id: "5b6d624a58e05b2c48885829",
    name: "First User",
    username: "ChosenOne"
  }

  beforeEach(() => {
    mockUpdateLikes = jest.fn()
    const mockDummy = jest.fn()
    blogComponent = shallow(<Blog
      blog={blog}
      username='ChosenOne'
      updateLikes={mockUpdateLikes}
      deleteBlog={mockDummy}
      setNotification={mockDummy}
    />)
  })

  it('inititally renders only title and author', () => {
    const infoDiv = blogComponent.find('.stubInfo')
    const fullInfoDiv = blogComponent.find('.fullInfo')

    expect(infoDiv.text()).toContain(blog.title)
    expect(infoDiv.text()).toContain(blog.author)
    expect(fullInfoDiv.getElement().props.style).toEqual({ display: 'none' })
  })

  it('clicking button shows full info', () => {
    const nameDiv = blogComponent.find('h4')
    nameDiv.at(0).simulate('click')

    const fullInfoDiv = blogComponent.find('.fullInfo')
    expect(fullInfoDiv.getElement().props.style).toEqual({ display: '' })
  })
})