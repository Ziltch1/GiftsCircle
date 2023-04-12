import React, {useState} from 'react'
import DeliveriesHeader from './subpages/DeliveriesHeader'
import Search from '../../components/Search/Search'
import { Box, position } from '@chakra-ui/react'
import OpenDeliveries from './subpages/OpenDeliveries'
import ClosedDeliveries from './subpages/ClosedDeliveries'

const Index = () => {
  const [navPosition, setNavPosition] = useState(0);
  return (
    <Box bg='#F5F5F5' h='100%' pb='12'>
        <Box w='85%' mx='auto'>
              <DeliveriesHeader navPosition={navPosition} setNavPosition={setNavPosition} />
              <Search />

              <Box>
                {navPosition === 0 && <OpenDeliveries />}
                {navPosition === 1 && <ClosedDeliveries />}
              </Box>
        </Box>
    </Box>
  )
}

export default Index