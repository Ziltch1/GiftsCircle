import React, { useState } from 'react';
import EventImages from './EventImages';
import Tabs from './Tabs';
import EventDetails from './EventDetails';
import EventGifts from './EventGifts';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Index = () => {
  const [navPosition, setNavPosition] = useState(0);

  const { newEvent } = useSelector(state => state.event);

  return (
    <Box w="80%" mx="auto" pt="3" pb="7">
      <>
        <Box>
          <EventImages newEvent={newEvent} />
        </Box>
        <Tabs navPosition={navPosition} setNavPosition={setNavPosition} />
        <Box>
          {navPosition === 0 && <EventDetails newEvent={newEvent} />}
          {navPosition === 1 && <EventGifts newEvent={newEvent} />}
        </Box>
      </>
    </Box>
  );
};

export default Index;
