import React, {useState} from 'react'
import SettingsHeader from './components/SettingsHeader'
import { Box } from '@chakra-ui/react'
import ProfileForms from './subpages/ProfileForms'

const Index = () => {
  const [navPosition, setNavPosition] = useState(0);
  return (
    <Box bg='#F5F5F5' h='100%' pb='8'>
        <Box w='85%' mx='auto'>
              <SettingsHeader navPosition={navPosition} setNavPosition={setNavPosition} />
              <ProfileForms />
        </Box>
    </Box>
  )
}

export default Index