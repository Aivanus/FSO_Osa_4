import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, FormField, Header } from 'semantic-ui-react'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
    <div>
      <Header as="h2">Log in to application</Header>

      <Form onSubmit={handleSubmit}>
        <FormField>
          <label>username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <label>password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </FormField>
        <Button primary type="submit">login</Button>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm