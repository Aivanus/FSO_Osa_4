import React from 'react'
import { connect } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { blogUpdate, blogRemove } from '../reducers/blogReducer'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  static propTypes = {
    blog: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    if (!this.props.blog.user) {
      this.props.blog.user = { name: 'Anonymous' }
    }
    this.state = {
      fullInfo: false
    }
  }

  toggleView = () => {
    this.setState({ fullInfo: !this.state.fullInfo })
  }

  delete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Do you want to delete ${this.props.blog.title}?`)) {
      try {
         this.props.blogRemove(this.props.blog._id)
        this.props.notify(`Blog ${this.props.blog.title} is deleted!`, 'success')
      } catch (exeption) {
        console.log(exeption)
        console.log('not deleted')
        this.props.notify(`Cannot delete this blog`, 'error')
      }
    }
  }

  handleLike = async (event) => {
    event.preventDefault()
    try {
      this.props.blogUpdate(this.props.blog._id, {
        user: this.props.blog.user._id,
        author: this.props.blog.author,
        title: this.props.blog.title,
        url: this.props.blog.url,
        likes: this.props.blog.likes + 1
      })

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
    const authorizedToDelete = {
      display: (this.props.blog.user.username === undefined || this.props.blog.user.username.toString() === this.props.currentUsername.toString()) ? '' : 'none'
    }

    return (
      <div style={blogStyle}>
        <div style={hideWhenFullInfo} className="stubInfo">
          <h4 onClick={this.toggleView}>{this.props.blog.title} {this.props.blog.author}</h4>
        </div>
        <div style={showWhenFullInfo} className="fullInfo">
          <h4 onClick={this.toggleView}>{this.props.blog.title} {this.props.blog.author}</h4>
          <a href={this.props.blog.url}>{this.props.blog.url}</a>
          <p>
            {this.props.blog.likes} likes
            <button onClick={this.handleLike}>like</button>
          </p>
          <p>Added by {this.props.blog.user.name}</p>
          <div style={authorizedToDelete}>
            <button onClick={this.delete}>delete</button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUsername: state.loggedUser.username,
    props: ownProps
  }
}

export default connect(mapStateToProps, { notify, blogUpdate, blogRemove })(Blog)