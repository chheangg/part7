import { HStack, Grid, Box, Button, Container } from '@chakra-ui/react'

const NavBar = ({ children, user, handleLogout }) => (
  <nav>
    <Box bgColor='blackAlpha.50' boxShadow='md'>
      <Container maxW='100ch'>
        <HStack fontSize='lg' py='6' spacing='2rem'>
          {children}
          <Grid
            gap='6'
            gridTemplateColumns='1fr auto'
            alignItems='center'
          >
            <Box
              bgColor='transparent'
              py='1.5' border='1px' borderColor='cyan.500'
              px='4' rounded='md' color='cyan.500'>
              {user.name} logged in
            </Box>
            <Box>
              <form onSubmit={handleLogout}>
                <Button color='red.500' variant='ghost' type="submit">Logout</Button>
              </form>
            </Box>
          </Grid>
        </HStack>
      </Container>
    </Box>
  </nav>
)

export default NavBar