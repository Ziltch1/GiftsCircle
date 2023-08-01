import { Box } from '@chakra-ui/react';
import React, { createContext, useMemo, useState } from 'react';
import FilterButtons from './components/FilterButtons';
import GiftHeader from './components/Header';
import Search from './components/Search';
import GiftCard from './components/GiftCard';
import { CreateManyGiftsApi } from '../../../../redux/axios/apis/gift';
import { dispatch } from '../../../../redux/store';
import { GetEventGifts } from '../../../../redux/features/events/service';
import { useSelector } from 'react-redux';
import BackButton from '../../../../components/Buttons/BackButton';
import FormFooter from './components/FormFooter';

export const GiftContext = createContext(null);

const Index = ({ step, setStep, setShowMarketplace }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [GiftItems, setGiftItems] = useState([]);
  const [addedGiftItems, setAddedGiftItems] = useState([]);
  const { newEvent } = useSelector(state => state.event);
  const { user } = useSelector(state => state.user);
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
      dispatch(GetEventGifts(newEvent.id, user.id));
      setShowMarketplace(false);
      await setGiftItems([]);
      await setAddedGiftItems([]);
    } catch (error) {
      console.log(error);
    }
  };

  const BackAction = () => {
    setShowMarketplace(false);
  };


  const handleIncrement = (id) => {
    setGiftItems((prevItems) =>
      prevItems.map((item) =>
        item.giftitemId === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };


  const handleDecrement = (id) => {
    setGiftItems((prevItems) =>
      prevItems.map((item) =>
        item.giftitemId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };



  return (
    <Box bg="#F5F5F5" h="100%" py="10" px="5">
      <Box w="100%" mx="auto">
        <GiftContext.Provider
          value={{ ...contextValue, setAddedGiftItems, setGiftItems, quantity, setQuantity, handleIncrement, handleDecrement }}
        >
          <BackButton action={BackAction} />
          <GiftHeader openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
          <Search />
          <FilterButtons />
          <GiftCard />
          <FormFooter action={HandleSubmit} />
        </GiftContext.Provider>
      </Box>
    </Box>
  );
};

export default Index;
