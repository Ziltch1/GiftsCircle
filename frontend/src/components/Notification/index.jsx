import React, {useState} from 'react'
import { Box } from '@chakra-ui/react'
import NotificationHeader from './subpages/NotificationHeader'
import Notifications, { ReadNotifications } from './subpages/Notifications'

const Index = ({ dropdownRef, notifications, setNotifications, setNotificationLength }) => {
    const [navPosition, setNavPosition] = useState(0)
  return (
      <Box ref={dropdownRef} w='350px' h='400px' bg='white' boxShadow='lg' borderRadius='10px' p='4' position='absolute' right='70px' top='70px' zIndex='overlay' overflow='auto'>
        <NotificationHeader navPosition={navPosition} setNavPosition={setNavPosition} />
        {navPosition === 0 && <Notifications notifications={notifications} setNotifications={setNotifications} setNotificationLength={setNotificationLength} />}
        {navPosition === 1 && <ReadNotifications notifications={notifications} setNotifications={setNotifications} setNotificationLength={setNotificationLength} />} 
      </Box>
  )
}

export default Index