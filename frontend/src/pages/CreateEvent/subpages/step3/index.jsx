import { Box } from '@chakra-ui/react'
import React from 'react'
import FilterButtons from './FilterButtons'
import GiftHeader from './GiftHeader'
import Search from './Search'
import GiftCard from './subpages/GiftCard'

const Index = () => {
  return (
    <Box bg='#F5F5F5' h='100%' py='10' px='5'>
    <Box w='90%' mx='auto'>
      <GiftHeader />
      <Search />
      <FilterButtons />
      <GiftCard />
    </Box>
    </Box>
  )
}

export default Index