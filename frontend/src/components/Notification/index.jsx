import React, {useState} from 'react'
import { Box } from '@chakra-ui/react'
import NotificationHeader from './subpages/NotificationHeader'
import Notifications, { ReadNotifications } from './subpages/Notifications'

const Index = () => {
    const [navPosition, setNavPosition] = useState(0)
  return (
      <Box w='393px' h='520px' bg='white' boxShadow='lg' borderRadius='10px' p='5' position='absolute' right='70px' top='70px' zIndex='overlay'>
        <NotificationHeader navPosition={navPosition} setNavPosition={setNavPosition} />
        {navPosition === 0 && <Notifications />}
        {navPosition === 1 && <ReadNotifications/>} 
      </Box>
  )
}

export default Index