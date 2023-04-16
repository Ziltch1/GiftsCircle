import React, { useState, useEffect } from 'react';
import GiftHeader from './subpages/GiftHeader';
import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import ComplimentaryModal from './subpages/ComplimentaryModal';
import GiftCard from './subpages/GiftCard';
import GiftListDrawer from './subpages/GiftListDrawer';

const Index = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showListDrawer, setShowListDrawer] = useState(false);
  const [data, setData] = useState([]);
  const { eventGifts } = useSelector(state => state.event);

  useEffect(() => {
    if (eventGifts) {
      setData(eventGifts);
    }
  }, [eventGifts]);

  return (
    <Box>
      {openDrawer && <ComplimentaryModal setOpenDrawer={setOpenDrawer} />}
      {showListDrawer && (
        <GiftListDrawer setShowListDrawer={setShowListDrawer} />
      )}
      <GiftHeader
        setOpenDrawer={setOpenDrawer}
        setShowListDrawer={setShowListDrawer}
      />
      <Flex alignItems="center" flexWrap="wrap">
        {data.map(item => (
          <GiftCard key={data.indexOf(item)} gift={item} />
        ))}
      </Flex>
    </Box>
  );
};

export default Index;
