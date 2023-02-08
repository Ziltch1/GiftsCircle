import React from 'react'
import {Box, Text, Heading, Button, Flex} from '@chakra-ui/react'
import Search from '../components/Search/Search'
import Header from '../components/Header/Header'
import Navbar from '../components/Navbar/Navbar'
import WelcomeModal from '../components/WelcomeModal/WelcomeModal'

const Events = () => {
  return (
    <Box bg='#F5F5F5' h='100%'>
        <Header />
        <Navbar />
        
        <Box w='90%' mx='auto'>
              <Flex mt='8' justifyContent={'space-between'} alignItems='center' mb='5'>
                  <Box>
                      <Heading>Events</Heading>
                  </Box>
                  <Flex gap='4'>
                      <Button bg='rgba(204, 242, 240, 0.5)' color='#009F94'>Join an event</Button>
                      <Button bg='#00BFB2' color='white'>Create an event</Button>
                  </Flex>
              </Flex>

              <Box>
                  <Box>
                      <a href="">Your events</a>
                      <a href="">Events history</a>
                  </Box>
                  <Box></Box>
              </Box>

              <Search />

              <Box>
                  <Heading>Create Your Event</Heading>
                  <Text>Don’t waste time, click the button at right corner to create your event attatch your gift list</Text>
              </Box>
        </Box>
        <WelcomeModal />

    </Box>
  )
}

export default Events