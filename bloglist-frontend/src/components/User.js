import React from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { initUsers } from '../reducers/usersReducer'

const findUserById = (users, id) => {
  return users.find(u => u._id.toString() === id)
}

const UserInfo = (props) => {
  const user = findUserById(props.users, props.id)

  return (user ?
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(b =>
          <li key={b._id}>
            {`${b.title} by ${b.author}`}
          </li>
        )}
      </ul>
    </div>
    : null
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log('usres')
  console.log(state)
  return {
    users: state.users,
    props: ownProps
  }
}
const ConnectedUserInfo = connect(
  mapStateToProps
)(UserInfo)

const UserList = (props) => {
  return (
    <div>
      <Route
        path={`${props.match.path}/:id`}
        render={({ match }) => <ConnectedUserInfo id={match.params.id} />}
      />
      <div>
        <h3>Blog afficionados</h3>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Blogs</th>
            </tr>
            {props.users.map(u =>
              (<tr key={u._id}>
                <td><Link key={u._id} to={`${props.match.url}/${u._id}`}>{u.name}</Link></td>
                <td>{u.blogs.length}</td>
              </tr>)
            )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}



export default connect(
  mapStateToProps,
  { initUsers }
)(UserList)
