import React, { useState, useEffect, createContext } from 'react';
import GiftHeader from './subpages/GiftHeader';
import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import ComplimentaryModal from './subpages/ComplimentaryModal';
import GiftCard from './subpages/GiftCard';
import GiftListDrawer from './subpages/GiftListDrawer';

export const CartContext = createContext(null);

const Index = ({ event }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showListDrawer, setShowListDrawer] = useState(false);
  const [data, setData] = useState([]);
  const { eventGifts } = useSelector(state => state.event);
  const { complimentaryGifts } = useSelector(state => state.gift);
  const [giftCart, setGiftCart] = useState([]);
  const [complimentaryCart, setComplimentaryCart] = useState([]);

  useEffect(() => {
    if (eventGifts) {
      setData(eventGifts);
    }
  }, [eventGifts]);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('Cart'));
    if (data) {
      data.giftItems = giftCart;
      localStorage.setItem('Cart', JSON.stringify(data));
    }
  }, [giftCart]);

  return (
    <Box>
      <CartContext.Provider
        value={{
          giftCart,
          gifts: data,
          complimentaryGifts,
        }}
      >
        {openDrawer && (
          <ComplimentaryModal
            setOpenDrawer={setOpenDrawer}
            data={complimentaryGifts}
            complimentaryCart={complimentaryCart}
            setComplimentaryCart={setComplimentaryCart}
          />
        )}
        {showListDrawer && (
          <GiftListDrawer
            setShowListDrawer={setShowListDrawer}
            giftCart={giftCart}
            setGiftCart={setGiftCart}
            complimentaryCart={complimentaryCart}
            data={complimentaryGifts}
            setComplimentaryCart={setComplimentaryCart}
          />
        )}
        <GiftHeader
          giftCount={data.length}
          setOpenDrawer={setOpenDrawer}
          setShowListDrawer={setShowListDrawer}
          giftCart={giftCart}
          complimentaryCart={complimentaryCart}
        />
        <Flex alignItems="center" flexWrap="wrap">
          {data.map(item => (
            <GiftCard
              event={event}
              key={data.indexOf(item)}
              gift={item}
              giftCart={giftCart}
              setGiftCart={setGiftCart}
            />
          ))}
        </Flex>
      </CartContext.Provider>
    </Box>
  );
};

export default Index;
