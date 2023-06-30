import React from 'react';
import { Box } from '@chakra-ui/react';
import EventSchedule from './SubPages/EventSchedule';

const Index = ({ newEvent }) => {
  return (
    <Box>
      <Box>
        <EventSchedule newEvent={newEvent} />
      </Box>
    </Box>
  );
};

export default Index;
