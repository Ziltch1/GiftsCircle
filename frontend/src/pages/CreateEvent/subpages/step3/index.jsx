import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import FilterButtons from './FilterButtons';
import GiftHeader from './GiftHeader';
import Search from './Search';
import GiftCard from './subpages/GiftCard';
import FormFooter from '../FormFooter';
import { CreateManyGiftsApi } from '../../../../redux/axios/apis/gift';
import { dispatch } from '../../../../redux/store';
import { GetEventGifts } from '../../../../redux/features/events/service';
import { useSelector } from 'react-redux';
import BackButton from '../BackButton';

const Index = ({ step, setStep }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [GiftItems, setGiftItems] = useState([]);
  const [addedGiftItems, setAddedGiftItems] = useState([]);
  const [enableContribution, setEnableContribution] = useState(false);
  const { newEvent } = useSelector(state => state.event);

  const HandleSubmit = async () => {
    try {
      await CreateManyGiftsApi(GiftItems);
      dispatch(GetEventGifts(newEvent.id));
      setStep(step + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (enableContribution) {
      setGiftItems(
        GiftItems.map(ele => {
          ele.enableContribution = true;
          return ele;
        })
      );
    } else {
      setGiftItems(
        GiftItems.map(ele => {
          ele.enableContribution = false;
          return ele;
        })
      );
    }
  }, [enableContribution]);

  const BackAction = () => {
    setStep(2);
  };
  return (
    <Box bg="#F5F5F5" h="100%" py="10" px="5">
      <Box w="90%" mx="auto">
        <BackButton action={BackAction} />
        <GiftHeader
          openDrawer={openDrawer}
          setOpenDrawer={setOpenDrawer}
          GiftItems={GiftItems}
          setAddedGiftItems={setAddedGiftItems}
          setGiftItems={setGiftItems}
          setEnableContribution={setEnableContribution}
        />
        <Search />
        <FilterButtons />
        <GiftCard
          setGiftItems={setGiftItems}
          setAddedGiftItems={setAddedGiftItems}
          addedGiftItems={addedGiftItems}
        />
      </Box>
      <FormFooter action={HandleSubmit} step={step} />
    </Box>
  );
};

export default Index;
