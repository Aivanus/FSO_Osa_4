import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, FormField, Header} from 'semantic-ui-react'

const BlogForm = ({ handleSubmit, handleChange, title, author, url }) => {
  return (
    <div>
      <Header as="h2">Create new</Header>

      <Form onSubmit={handleSubmit}>
        <FormField>
          <label>title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <label>author</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
          />
        </FormField>
        <FormField>
          <label>url</label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleChange}
          />
        </FormField>
        <Button primary type="submit">create</Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default BlogForm