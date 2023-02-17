import React from 'react'
import {Box, Button, Text, Heading, Input, FormLabel} from '@chakra-ui/react'

const UploadedMedia = () => {
  return (
    <Box>
      <Box>
        <Heading mb='5' fontWeight='semibold' fontSize={30}>Media Empty</Heading>
        <Text>Your media is currently empty, share videos and images of the event to your guest list here</Text>
        <FormLabel htmlFor='upload'>
          <Input type='file' id='upload' />
        </FormLabel>
      </Box>
    </Box>
  )
}

export default UploadedMedia 