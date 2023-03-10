import React from 'react'
import {Box, Image, Flex, Button} from '@chakra-ui/react'
import logo from '../../../assets/gift_circle_logo.svg'
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
          <Button bg='none' color='#0C4C84'> <AddIcon mr='1.5' /> Create an event</Button>
          <Button bg='none' _hover={{bg: 'none'}}><Link to="/signin">Sign in</Link></Button>
          <Button bg={'#0C4C84'} color='white' boxShadow={'md'} _hover={{ bg: '#0C4C84'}}><Link to="/signup">Create an account</Link></Button>
        </Box>
      </Flex>
    </Box>
  )
}

export default Navbar