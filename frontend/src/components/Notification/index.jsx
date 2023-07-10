import React, {useState} from 'react'
import { Box } from '@chakra-ui/react'
import NotificationHeader from './subpages/NotificationHeader'
import Notifications, { ReadNotifications } from './subpages/Notifications'

const Index = ({dropdownRef}) => {
    const [navPosition, setNavPosition] = useState(0)
  return (
      <Box ref={dropdownRef} w='350px' h='400px' bg='white' boxShadow='lg' borderRadius='10px' p='4' position='absolute' right='70px' top='70px' zIndex='overlay' overflow='auto'>
        <NotificationHeader navPosition={navPosition} setNavPosition={setNavPosition} />
        {navPosition === 0 && <Notifications />}
        {navPosition === 1 && <ReadNotifications/>} 
      </Box>
  )
}

export default Index