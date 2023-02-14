import React from 'react';
import { Box } from '@chakra-ui/react';
// import EventImages from './SubPages/EventImages';
// import Tabs from './SubPages/Tabs';
import EventSchedule from './SubPages/EventSchedule';
import EventHosts from './SubPages/EventHosts'
import Gifts from '../EventGifts'

const index = () => {
  return (
    <Box>
      <Box>
        <EventSchedule />
        <EventHosts />
      </Box>
    </Box>
  );
};

export default index;
