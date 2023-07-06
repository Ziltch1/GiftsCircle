import React, {useState} from 'react'
import {Box} from '@chakra-ui/react'
import MediaHeader from './subpages/MediaHeader'
import UploadedMedia from './subpages/UploadedMedia'
import ReceivedMedia from './subpages/ReceivedMedia'
import MediaMessages from './subpages/MediaMessages'

const Index = () => {
  const [navPosition, setNavPosition] = useState(0);

  return (
    <Box>
          <MediaHeader navPosition={navPosition} setNavPosition={setNavPosition} />
          <Box>
              {navPosition === 0 && <UploadedMedia />}
              {navPosition === 1 && <ReceivedMedia />}
              {navPosition === 2 && <MediaMessages />}
          </Box>
    </Box>
  )
}

export default Index