import React, { useState, createContext, useMemo } from 'react';
import GiftHeader from './subpages/GiftHeader';
import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import ComplimentaryModal from './subpages/ComplimentaryModal';
import GiftListDrawer from './subpages/GiftListDrawer';
import DisplayCard from '../../../../components/Card';

export const CartContext = createContext(null);

const Index = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showListDrawer, setShowListDrawer] = useState(false);
  const [data, setData] = useState([]);
  const { eventGifts } = useSelector(state => state.event);
  const { giftItems, complimentaryGifts } = useSelector(state => state.gift);
  const [GiftItems, setGiftItems] = useState([]);
  const [ComplimentaryItems, setComplimentaryItems] = useState([]);
  const [addedGiftItems, setAddedGiftItems] = useState([]);
  const [addedComplimentaryGiftItems, setAddedComplimentaryGiftItems] =
    useState([]);
  const [amount, setAmount] = useState(0);
  const [giftAmount, setGiftAmount] = useState(0);
  const [complimentaryGiftAmount, setComplimentaryGiftAmount] = useState(0);

  const addGift = id => {
    let newItem = eventGifts.find(x => x.giftItemId === id);
    if (!addedGiftItems.includes(newItem.id)) {
      setGiftItems([...GiftItems, newItem]);
      setAddedGiftItems([...addedGiftItems, newItem.id]);
    }
  };

  const contextValue = useMemo(
    () => ({
      data: [...eventGifts],
      GiftItems,
      ComplimentaryItems,
      addedGiftItems,
      addedComplimentaryGiftItems,
      giftItems,
      complimentaryGifts,
      amount,
      giftAmount,
      complimentaryGiftAmount,
    }),
    [
      eventGifts,
      GiftItems,
      ComplimentaryItems,
      addedGiftItems,
      addedComplimentaryGiftItems,
      giftItems,
      complimentaryGifts,
      amount,
      giftAmount,
      complimentaryGiftAmount,
    ]
  );

  return (
    <Box>
      <CartContext.Provider
        value={{
          ...contextValue,
          setAddedComplimentaryGiftItems,
          setAddedGiftItems,
          setAmount,
          setData,
          setComplimentaryItems,
          setGiftItems,
          setGiftAmount,
          setComplimentaryGiftAmount,
        }}
      >
        {openDrawer && <ComplimentaryModal setOpenDrawer={setOpenDrawer} />}
        {showListDrawer && (
          <GiftListDrawer setShowListDrawer={setShowListDrawer} />
        )}
        <GiftHeader
          setOpenDrawer={setOpenDrawer}
          setShowListDrawer={setShowListDrawer}
        />
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          {eventGifts.map(item => {
            const giftItem = giftItems.find(x => x.id === item?.giftItemId);
            return (
              <DisplayCard
                id={item.id}
                data={giftItem}
                action={addGift}
                disabled={
                  addedGiftItems.includes(item.id) ||
                  item.amountPaid === giftItem.amount
                }
                purchased={item.amountPaid === giftItem.amount}
                text={'Purchase'}
              />
            );
          })}
        </Flex>
      </CartContext.Provider>
    </Box>
  );
};

export default Index;
