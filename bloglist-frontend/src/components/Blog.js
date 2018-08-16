import React from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'

import { notify } from '../reducers/notificationReducer'
import { blogUpdate, blogRemove } from '../reducers/blogReducer'

import BlogInfo from '../components/BlogInfo'

class BlogList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div>
        <h1>Blogs</h1>
        <Route
          path={`${this.props.match.path}/:id`}
          render={({ match }) => <BlogInfo id={match.params.id} />}
        />
        <div>
          <div className="stubInfo">
            {this.props.blogs.map(b =>
              <div key={b._id} style={blogStyle}>
                <Link key={b._id} to={`${this.props.match.url}/${b._id}`}>
                  {b.title} {b.author}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUsername: state.loggedUser ? state.loggedUser.username : null,
    blogs: state.blogs.sort((a, b) => b.likes - a.likes)
  }
}


export default connect(mapStateToProps, { notify, blogUpdate, blogRemove })(BlogList)