
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

const Blog = ({ blog }) => (
  <Box   px='2' py='2' rounded='sm' bgColor='cyan.200'>
    <div>
      <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
    </div>
  </Box>
)

Blog.propTypes = {
  blog: PropTypes.object,
}

export default Blog
