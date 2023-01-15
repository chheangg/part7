import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from '@chakra-ui/react'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const handleVisibility = () => setVisible(!visible)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  useImperativeHandle(refs, () => {
    return {
      handleVisibility,
    }
  })

  return (
    <Box my='4'>
      <div style={hideWhenVisible}>
        <Button size='sm' colorScheme='cyan' color='white' onClick={handleVisibility}>{props.buttonText}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button size='sm' variant='ghost'  onClick={handleVisibility}>Cancel</Button>
      </div>
    </Box>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonText: PropTypes.string.isRequired,
}

export default Togglable
