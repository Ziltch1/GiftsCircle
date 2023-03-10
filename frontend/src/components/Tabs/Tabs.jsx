import React from 'react'
import {Box, Flex, Button, Heading} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Tabs = () => {
  return (
    <Box>
            <Flex pt='8' justifyContent={'space-between'} alignItems='center' mb='8'>
                  <Box>
                      <Heading size='lg'>Events</Heading>
                  </Box>
                  <Flex gap='4'>
                      <Button bg='rgba(204, 242, 240, 0.5)' color='#009F94' fontWeight={'medium'} fontSize='14px'>Join an event</Button>
                      <Link to='/create_event'><Button bg='#00BFB2' color='white' fontWeight={'medium'} fontSize='14px'>Create an event</Button></Link>
                  </Flex>
              </Flex>

              <Box borderBottom='1.5px solid lightgrey' w='100%' mb='5'>
                  <Flex gap={8} fontSize='14px'>
                      <Button borderBottom='2px solid #00BFB2' bg='none' borderRadius={0} _hover={{bg: 'none'}}>Your events</Button>
                      <Button bg='none' borderRadius={0} _hover={{ bg: 'none' }}>Events history</Button>
                  </Flex>
              </Box> 
    </Box>
  )
}

export default Tabs