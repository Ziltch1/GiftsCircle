import { Box } from '@chakra-ui/react'
import React, {useState} from 'react'
import FilterButtons from './FilterButtons'
import GiftHeader from './GiftHeader'
import Search from './Search'
import GiftCard from './subpages/GiftCard'

const Index = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openGiftDetails, setOpenGiftDetails] = useState(false);
  return (
    <Box bg='#F5F5F5' h='100%' py='10' px='5'>
    <Box w='90%' mx='auto'>
      <GiftHeader openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      <Search />
      <FilterButtons />
      <GiftCard openGiftDetails={openGiftDetails} setOpenGiftDetails={setOpenGiftDetails} />
    </Box>
    </Box>
  )
}

export default Index