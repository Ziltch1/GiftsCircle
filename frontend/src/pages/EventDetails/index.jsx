import React from 'react';
import { Box } from '@chakra-ui/react';
import EventImages from './SubPages/EventImages';
import Tabs from './SubPages/Tabs';
import EventSchedule from './SubPages/EventSchedule';
import EventHosts from './SubPages/EventHosts';
import Gifts from '../EventGifts'

const index = () => {
  return (
    <Box bg='#F5F5F5' h='100%'>
      <Box w="76%" mx="auto" pt="8" pb='7'>
        <EventImages />
        <Tabs />
        <Gifts />
        {/* <EventSchedule />
        <EventHosts /> */}
      </Box>
    </Box>
  );
};

export default index;
