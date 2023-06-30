import React, { useState, useEffect } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import GiftLists from './subpages/GiftLists';
import { useSelector } from 'react-redux';
import { GetEventGifts } from '../../../../../../redux/features/events/service';
import { dispatch } from '../../../../../../redux/store';

const Index = ({ newEvent }) => {
  const eventId = newEvent.id;
  const [data, setData] = useState([]);

  const { eventGifts } = useSelector(state => state.event);

  useEffect(() => {
    dispatch(GetEventGifts(eventId));
  }, [eventId]);

  useEffect(() => {
    if (eventGifts) {
      setData(eventGifts);
    }
  }, [eventGifts]);

  return (
    <Box>
      <Box mb="5">
        <Heading mb="5" fontWeight={'medium'} fontSize={24}>
          Gift
        </Heading>
      </Box>
      <GiftLists data={data} />
    </Box>
  );
};

export default Index;
