import React from 'react'
import { Box, Image, Text, Heading, Flex, Button} from '@chakra-ui/react'
import Tabs from './Tabs'
import EventImages from './EventImages'
import EventHosts from './EventHosts'
import EventSchedule from './EventSchedule'


const EventDetails = () => {
  return (
    <Box w='76%' mx='auto' mt='8'>
      <EventImages />
      <Tabs />
      <EventSchedule />
      <EventHosts />
    </Box>
  )
}

export default EventDetails