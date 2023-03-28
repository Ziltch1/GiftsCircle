import React, { useState, useEffect } from 'react';
import GiftHeader from './subpages/GiftHeader';
import PurchaseHistory from './subpages/PurchaseHistory';
import { Box } from '@chakra-ui/react';
import GiftLists from './subpages/GiftLists';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../../redux/store';
import { GetEventGifts } from '../../../../redux/features/events/service';
import GiftCard from './subpages/GiftCard';

const Index = ({ newEvent }) => {
  const eventId = newEvent?.id;
  const [navPosition, setNavPosition] = useState(0);
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
      <GiftHeader navPosition={navPosition} setNavPosition={setNavPosition} />
      <Box>
        {/* {navPosition === 0 && <PurchaseHistory data={data}/>}
        {navPosition === 1 && <GiftLists data={data}/>} */}
        <GiftCard />
      </Box>
    </Box>
  );
};

export default Index;
