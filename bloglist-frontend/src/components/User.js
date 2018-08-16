import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {initUsers} from '../reducers/usersReducer'

// const User = ({ user }) => {
//   return (
//     <tr>
//       <td><Link to={`${}/${user._id}`}>{user.name}</Link></td>
//       <td>{user.blogs.length}</td>
//     </tr>
//   )
// }

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
      {/* <Route
        exact path={`${props.match.path}/5b6d624d58e05b2c4888582a`}
        render={() => console.log('here')}
      /> */}
      <Route
        path={`${props.match.path}/:id`}
        // render={() => <UserInfo />}
        // render={(props) => <UserInfo user={users} />}
        // render={({ match }) => <ConnectedUserInfo />}
        render={({ match }) => <ConnectedUserInfo id={match.params.id} />}
      // render={(props) => <UserInfo user={tt.find(u => u._id === props.match.params.id)} {...props} />}
      // render={(props) => <UserInfo user={props.users.find(u => u._id === props.match.params.id)} />}
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
                {/* {console.log(`${props.match.url}${u._id}`)} */}
                <td>{u.blogs.length}</td>
              </tr>)
            )

              //   < User key = { u._id } user = { u } />
              // )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}



export default connect(
  mapStateToProps,
  {initUsers}
)(UserList)
