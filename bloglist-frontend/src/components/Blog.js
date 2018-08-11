import React from 'react'

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
            <button>like</button>
          </p>
          <p>Added by {this.props.blog.user.name}</p>
        </div>
      </div>
    )
  }
}
// const Blog = ({ blog }) => (
//   <div>
//     {blog.title} {blog.author}
//   </div>
// )

export default Blog