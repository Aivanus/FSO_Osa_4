import React from 'react'
import { connect } from 'react-redux'

const User = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.blogsCount}</td>
    </tr>
  )
}

const UserList = (props) => {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Blogs</th>
          </tr>
          {props.users.map(u =>
            <User key={u._id} name={u.name} blogsCount={u.blogs.length} />
          )}
        </tbody>
      </table>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
    props: ownProps
  }
}

export default connect(
  mapStateToProps
)(UserList)


// export default UserList