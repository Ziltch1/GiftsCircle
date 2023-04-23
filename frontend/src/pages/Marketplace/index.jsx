import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import MarketplaceOptions from './MarketplaceOptions'
import Navbar from '../../components/Navbar/Navbar'


const index = () => {
  return (
    <Box>
    <Box bg='#F5F5F5' minH='580px' display='flex' alignItems='center' justifyContent='center'>
       <Box w='90%' mx='auto'>
              <Box textAlign='center' maxW='540px' mx='auto' mb='8'>
                  <Heading fontSize={36} mb='5'>Welcome to marketplace</Heading>
                  <Text fontSize={14}>We have created this page so you could find things that you need for your event and easily order for it for yourself.</Text>
              </Box>
              <MarketplaceOptions />
       </Box>
    </Box>
    </Box>
  )
}

export default index