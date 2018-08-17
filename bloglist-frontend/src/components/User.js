import React from 'react'
import { connect } from 'react-redux'
import { Route, Link } from 'react-router-dom'
import { initUsers } from '../reducers/usersReducer'
import { Header, Table, TableBody, TableCell, TableRow, List } from 'semantic-ui-react'

const findUserById = (users, id) => {
  return users.find(u => u._id.toString() === id)
}

const UserInfo = (props) => {
  const user = findUserById(props.users, props.id)

  return (user ?
    <div>
      <Header as="h2">{user.name}</Header>
      <Header as="h3">Added blogs</Header>
      <List bulleted>
        {user.blogs.map(b =>
          <List.Item key={b._id}>
            {`${b.title} by ${b.author}`}
          </List.Item>
        )}
      </List>
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
      <Route
        path={`${props.match.path}/:id`}
        render={({ match }) => <ConnectedUserInfo id={match.params.id} />}
      />
      <div>
        <h3>Blog afficionados</h3>
        <Table>
          <Table.Header>
            <TableRow>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Blogs</Table.HeaderCell>
            </TableRow>
          </Table.Header>
          <TableBody>
            {props.users.map(u =>
              (<TableRow key={u._id}>
                <TableCell><Link key={u._id} to={`${props.match.url}/${u._id}`}>{u.name}</Link></TableCell>
                <TableCell>{u.blogs.length}</TableCell>
              </TableRow>)
            )
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}



export default connect(
  mapStateToProps,
  { initUsers }
)(UserList)
