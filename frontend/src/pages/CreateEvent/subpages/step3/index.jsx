import { Box } from '@chakra-ui/react';
import React, { createContext, useMemo, useState } from 'react';
import FilterButtons from './components/FilterButtons';
import GiftHeader from './components/Header';
import Search from './components/Search';
import GiftCard from './components/GiftCard';
import FormFooter from '../../components/FormFooter';
import { CreateManyGiftsApi } from '../../../../redux/axios/apis/gift';
import { dispatch } from '../../../../redux/store';
import { GetEventGifts } from '../../../../redux/features/events/service';
import { useSelector } from 'react-redux';
import BackButton from '../../../../components/Buttons/BackButton';

export const GiftContext = createContext(null);

const Index = ({ step, setStep }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [GiftItems, setGiftItems] = useState([]);
  const [addedGiftItems, setAddedGiftItems] = useState([]);
  const { newEvent } = useSelector(state => state.event);
  const [quantity, setQuantity] = useState(1)

  const contextValue = useMemo(
    () => ({
      GiftItems,
      addedGiftItems,
    }),
    [GiftItems, addedGiftItems]
  );

  const HandleSubmit = async () => {
    try {
      await CreateManyGiftsApi(GiftItems);
      dispatch(GetEventGifts(newEvent.id));
      setStep(step + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const BackAction = () => {
    setStep(2);
  };


  const handleIncrement = (id) => {
    setGiftItems((prevItems) =>
      prevItems.map((item) =>
        item.giftItemId === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };


  const handleDecrement = (id) => {
    setGiftItems((prevItems) =>
      prevItems.map((item) =>
        item.giftItemId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };



  return (
    <Box bg="#F5F5F5" h="100%" py="10" px="5">
      <Box w="90%" mx="auto">
        <GiftContext.Provider
          value={{ ...contextValue, setAddedGiftItems, setGiftItems, quantity, setQuantity, handleIncrement, handleDecrement }}
        >
          <BackButton action={BackAction} />
          <GiftHeader openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
          <Search />
          <FilterButtons />
          <GiftCard />
        </GiftContext.Provider>
      </Box>
      <FormFooter action={HandleSubmit} step={step} />
    </Box>
  );
};

export default Index;
