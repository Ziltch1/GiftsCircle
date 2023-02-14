import React from 'react'
import {Box, Image, Flex, Button} from '@chakra-ui/react'
import logo from '../../../components/assets/event-circle1.svg';
import {AddIcon} from '@chakra-ui/icons'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box p='3' boxShadow={'sm'}>
      <Flex w='90%' mx='auto' justifyContent='space-between' alignItems={'center'}>
        <Box>
          <Image src={logo} />
        </Box>

        <Box>
          <Button bg='none' color='#0C4C84'> <AddIcon mr='1.5' /> <Link to='/event'>Create an event</Link></Button>
          <Button bg='none' _hover={{bg: 'none'}}><Link to="/signin">Sign in</Link></Button>
          <Button bg={'#0C4C84'} color='white' boxShadow={'md'} _hover={{ bg: '#0C4C84'}}><Link to="/signup">Create an account</Link></Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default Navbar