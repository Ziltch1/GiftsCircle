import React, { useState, useEffect, createContext } from 'react';
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
  const { giftItems } = useSelector(state => state.gift);
  const { complimentaryGifts } = useSelector(state => state.gift);
  const [giftCart, setGiftCart] = useState([]);
  const [complimentaryCart, setComplimentaryCart] = useState([]);

  const addGift = id => {
    setGiftCart([...giftCart, id]);
  };

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
        <Flex
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          {data.map(item => {
            const giftItem = giftItems.find(x => x.id === item?.giftItemId);
            return (
              <DisplayCard
                id={item.id}
                data={giftItem}
                action={addGift}
                disabled={giftCart.includes(item?.giftItemId)}
                text="Purchase"
              />
            );
          })}
        </Flex>
      </CartContext.Provider>
    </Box>
  );
};

export default Index;
