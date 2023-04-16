import React, { useState, useEffect } from 'react';
import GiftHeader from './subpages/GiftHeader';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../../redux/store';
import { GetEventGifts } from '../../../../redux/features/events/service';
import ComplimentaryModal from './subpages/ComplimentaryModal';
import GiftCard from './subpages/GiftCard';
import GiftListDrawer from './subpages/GiftListDrawer';

const Index = ({ newEvent }) => {
  const eventId = newEvent?.id;
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showListDrawer, setShowListDrawer] = useState(false)
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
      {openDrawer && <ComplimentaryModal setOpenDrawer={setOpenDrawer} />}
      {showListDrawer && <GiftListDrawer setShowListDrawer={setShowListDrawer} />}
      <GiftHeader setOpenDrawer={setOpenDrawer} setShowListDrawer={setShowListDrawer}  />
      <Box>
        <GiftCard setOpenDrawer={setOpenDrawer} />
      </Box>
    </Box>
  );
};

export default Index;
