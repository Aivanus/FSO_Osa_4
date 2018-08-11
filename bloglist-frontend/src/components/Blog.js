import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullInfo: false
    }
  }

  toggleView = () => {
    this.setState({ fullInfo: !this.state.fullInfo })
  }

  handleLike = async (event) => {
    event.preventDefault()
    try {
      const likedBlog = await blogService.update(this.props.blog._id,{
        user: this.props.blog.user._id,
        author: this.props.blog.author,
        title: this.props.blog.title,
        url: this.props.blog.url,
        likes: this.props.blog.likes + 1
      })

      this.props.blog.likes = likedBlog.likes
      // this.setState({})
      this.props.updateBlogs()
    } catch (exeption) {
      console.log(exeption)
    }
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const hideWhenFullInfo = { display: this.state.fullInfo ? 'none' : '' }
    const showWhenFullInfo = { display: this.state.fullInfo ? '' : 'none' }

    return (
      <div style={blogStyle}>
        <div style={hideWhenFullInfo} >
          <h4 onClick={this.toggleView}>{this.props.blog.title} {this.props.blog.author}</h4>
        </div>
        <div style={showWhenFullInfo}>
          <h4 onClick={this.toggleView}>{this.props.blog.title} {this.props.blog.author}</h4>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <p>
            {this.props.blog.likes} likes
            <button onClick={this.handleLike}>like</button>
          </p>
          <p>Added by {this.props.blog.user.name}</p>
        </div>
      </div>
    )
  }
}

export default Blog