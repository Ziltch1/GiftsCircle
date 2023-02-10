import React from 'react'
import {Box, Text, Heading, Button, Flex} from '@chakra-ui/react'
import Search from '../components/Search/Search'
import Header from '../components/Header/Header'
import Navbar from '../components/Navbar/Navbar'
import WelcomeModal from '../components/WelcomeModal/WelcomeModal'
import Tabs from './Tabs'

const Events = () => {
  const eventData = [
    {}
  ]
  return (
    <Box bg='#F5F5F5' h='100vh'>
      <WelcomeModal />
        <Navbar />
        <Box w='90%' mx='auto'>
              <Tabs />
              <Search />
              <Box textAlign={'center'} mt='100px'>
                  <Text fontSize={30} fontWeight='medium' mb='3'>Create your first event</Text>
                  <Text fontSize={14} mb='3'>Don’t waste time, click the button at right corner to <br /> create your event attatch your gift list</Text>
              </Box>
        </Box>

    </Box>
  )
}

export default Events