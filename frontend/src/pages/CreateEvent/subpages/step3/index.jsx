import { Box } from '@chakra-ui/react'
import React from 'react'
import GiftHeader from './GiftHeader'
import Search from './Search'

const Index = () => {
  return (
    <Box bg='#F5F5F5' h='100%' p='5'>
    <Box w='80%' mx='auto'>
      <GiftHeader />
      <Search />
    </Box>
    </Box>
  )
}

export default Index