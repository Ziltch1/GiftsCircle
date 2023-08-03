import React, { useState, useEffect } from 'react';
import GiftHeader from './subpages/GiftHeader';
import PurchaseHistory from './subpages/PurchaseHistory';
import { Box } from '@chakra-ui/react';
import GiftLists from './subpages/GiftLists';
import { useSelector } from 'react-redux';

const Index = ({ newEvent }) => {
  const eventId = newEvent.id;
  const [navPosition, setNavPosition] = useState(0);
  const [data, setData] = useState([]);

  const { eventGifts } = useSelector(state => state.event);

  useEffect(() => {
    if (eventGifts) {
      setData(eventGifts);
    }
  }, [eventGifts]);

  return (
    <Box>
      <GiftHeader
        navPosition={navPosition}
        setNavPosition={setNavPosition}
        event={newEvent}
      />
      {newEvent.published ? (
        <Box>
          {navPosition === 0 && <PurchaseHistory />}
          {navPosition === 1 && <GiftLists data={data} />}
        </Box>
      ) : (
        <GiftLists data={data} />
      )}
    </Box>
  );
};

export default Index;
