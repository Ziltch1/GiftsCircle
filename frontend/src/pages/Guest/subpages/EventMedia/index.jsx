import React, {useState} from 'react'
import {Box} from '@chakra-ui/react'
import MediaHeader from './subpages/MediaHeader'
import UploadedMedia from './subpages/UploadedMedia'
import ReceivedMedia from './subpages/ReceivedMedia'

const Index = () => {
  return (
    <Box>
          <MediaHeader />
          <Box>
            <UploadedMedia />
          </Box>
    </Box>
  )
}

export default Index