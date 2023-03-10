import { Box } from '@chakra-ui/react'
import React, {useState} from 'react'
import Search from '../../components/Search/Search'
import GiftHeader from './GiftHeader'
import PurchasedBy from './subpages/PurchasedBy'
import PurchasedFor from './subpages/PurchasedFor'

const Index = () => {
  const [navPosition, setNavPosition] = useState(0)
  return (
    <Box w='100%' bg='#f5f5f5' h='100%' pb='5'>
      <Box w='90%' mx='auto'>
        <GiftHeader navPosition={navPosition} setNavPosition={setNavPosition} />
        <Search />
        {navPosition === 0 && <PurchasedFor/>}
        {navPosition === 1 && <PurchasedBy />}
      </Box>
    </Box>
  )
}

export default Index