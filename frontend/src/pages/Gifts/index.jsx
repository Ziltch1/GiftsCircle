import { Box } from '@chakra-ui/react'
import React from 'react'
import Search from '../../components/Search/Search'
import GiftHeader from './GiftHeader'

const index = () => {
  return (
    <Box w='100%' bg='#f5f5f5' h='100vh'>
      <Box w='90%' mx='auto'>
        <GiftHeader />
        <Search />
      </Box>
    </Box>
  )
}

export default index