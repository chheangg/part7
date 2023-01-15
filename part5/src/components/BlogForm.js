import { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, Button } from '@chakra-ui/react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    addBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <Input
        my='3'
        variant='filled'
        size='sm'
        id="title"
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
      ></Input>
      <br></br>
      <label htmlFor="author">Author:</label>
      <Input
        my='3'
        variant='filled'
        size='sm'
        id="author"
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
      ></Input>
      <br></br>
      <label htmlFor="url">Url:</label>
      <Input
        my='3'
        variant='filled'
        size='sm'
        id="url"
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
      ></Input>
      <br></br>
      <Button size='md' colorScheme='cyan' color='white' my='2' id="create-blog" type="submit">
        create
      </Button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm
