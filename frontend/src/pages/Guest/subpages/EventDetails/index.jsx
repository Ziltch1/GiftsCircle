import React from 'react';
import { Box } from '@chakra-ui/react';
import EventSchedule from './SubPages/EventSchedule';
import EventHosts from './SubPages/EventHosts';

const Index = ({ newEvent }) => {
  return (
    <Box>
      <Box>
        <EventSchedule newEvent={newEvent} />
        {/* <EventHosts newEvent={newEvent} /> */}
      </Box>
    </Box>
  );
};

export default Index;
