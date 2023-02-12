import React from 'react';
import { Box } from '@chakra-ui/react';
import EventImages from './SubPages/EventImages';
import Tabs from './SubPages/Tabs';
import EventSchedule from './SubPages/EventSchedule';
import EventHosts from './SubPages/EventHosts';

const index = () => {
  return (
    <Box>
      <Box w="76%" mx="auto" mt="8">
        <EventImages />
        <Tabs />
        <EventSchedule />
        <EventHosts />
      </Box>
    </Box>
  );
};

export default index;
