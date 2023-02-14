import React, {useState} from 'react'
import EventImages from './EventImages'
import Tabs from './Tabs'
import EventDetails from './EventDetails'
import EventGifts from './EventGifts'
import {Box} from '@chakra-ui/react'
import Header from '../../components/Header/Header'

const Index = () => {
  const [navPosition, setNavPosition] = useState(0);
  return (
    <Box bg='#F5F5F5' h='100%'>
          <Header />
          <Box w="76%" mx="auto" pt="8" pb='7'>
              <EventImages />
              <Tabs navPosition={navPosition} setNavPosition={setNavPosition} />
              <Box>
                  {navPosition === 0 && <EventDetails /> }
                  {navPosition === 1 && <EventGifts /> }
              </Box>
          </Box>
    </Box>
     
  )
}

export default Index