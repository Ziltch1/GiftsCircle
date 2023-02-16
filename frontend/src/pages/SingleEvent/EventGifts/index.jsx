import React, {useState} from 'react'
import GiftHeader from './subpages/GiftHeader'
import PurchaseHistory from './subpages/PurchaseHistory'
import {Box} from '@chakra-ui/react'
import GiftLists from './subpages/GiftLists'

const Index = () => {
  const [navPosition, setNavPosition] = useState(0)
  return (
    <Box>
        <GiftHeader navPosition={navPosition} setNavPosition={setNavPosition} />
        <Box>
           {navPosition === 0 && <PurchaseHistory />}
           {navPosition === 1 && <GiftLists />}
        </Box>
    </Box>
  )
}

export default Index