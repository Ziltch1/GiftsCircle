import React from 'react'
import {Box} from '@chakra-ui/react'
import MediaHeader from './subpages/MediaHeader'
import UploadedMedia from './subpages/UploadedMedia'

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