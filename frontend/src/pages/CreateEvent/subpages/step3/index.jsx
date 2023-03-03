import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import FilterButtons from './FilterButtons';
import GiftHeader from './GiftHeader';
import Search from './Search';
import GiftCard from './subpages/GiftCard';
import FormFooter from '../FormFooter';

const Index = ({ step }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openGiftDetails, setOpenGiftDetails] = useState(false);
  const [giftItems, setGiftItems] = useState([]);

  const AddGifts = data => {
    setGiftItems(prev => [...prev, data]);
  };

  const HandleSubmit = () => {
    console.log(giftItems);
  };
  console.log(giftItems)
  return (
    <Box bg="#F5F5F5" h="100%" py="10" px="5">
      <Box w="90%" mx="auto">
        <GiftHeader openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        <Search />
        <FilterButtons />
        <GiftCard
          openGiftDetails={openGiftDetails}
          setOpenGiftDetails={setOpenGiftDetails}
          AddGift={AddGifts}
        />
      </Box>
      <FormFooter action={HandleSubmit} step={step} />
    </Box>
  );
};

export default Index;
