import React from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { List } from 'semantic-ui-react'


import { notify } from '../reducers/notificationReducer'
import { blogUpdate, blogRemove } from '../reducers/blogReducer'

import BlogInfo from '../components/BlogInfo'

class BlogList extends React.Component {

  render() {

    return (
      <div>
        <Route
          path={`${this.props.match.path}/:id`}
          render={({ match }) => <BlogInfo id={match.params.id} />}
        />
        <div>
          <List divided relaxed className="stubInfo">
            {this.props.blogs.map(b =>
              <List.Item key={b._id} >
                <Link key={b._id} to={`${this.props.match.url}/${b._id}`}>
                  {b.title} {b.author}
                </Link>
              </List.Item>
            )}
          </List>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUsername: state.loggedUser ? state.loggedUser.username : null,
    blogs: state.blogs.sort((a, b) => b.likes - a.likes)
  }
}


export default connect(mapStateToProps, { notify, blogUpdate, blogRemove })(BlogList)