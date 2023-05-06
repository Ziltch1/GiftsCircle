import React, { useState, useEffect, createContext } from 'react';
import GiftHeader from './subpages/GiftHeader';
import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import ComplimentaryModal from './subpages/ComplimentaryModal';
import GiftCard from './subpages/GiftCard';
import GiftListDrawer from './subpages/GiftListDrawer';
import { GetEventAsoebis } from '../../../../redux/features/events/service';
import { GetAddedAsoebiItemsApi, GetAsoebiItemsApi } from '../../../../redux/axios/apis/asoebi';
export const CartContext = createContext(null);


const Index = ({ event }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showListDrawer, setShowListDrawer] = useState(false);
  const [data, setData] = useState([]);
  const { eventAsoebis, eventGifts } = useSelector(state => state.event);
  const [asoebiCart, setAsoebiCart] = useState([]);
  
  const getAsoebi = async() => {
    try {
      const res = await GetAddedAsoebiItemsApi(event.id);
      const data = await res.data;
      setData(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAsoebi();
  }, []);

  return (
    <Box>
      <CartContext.Provider
        value={{
          asoebiCart,
          asoebiItems: data,
        }}
      >
        {showListDrawer && (
          <GiftListDrawer
            setShowListDrawer={setShowListDrawer}
            asoebiCart={asoebiCart}
            setAsoebiCart={setAsoebiCart}
          />
        )}
        <GiftHeader
          giftCount={data?.length}
          setOpenDrawer={setOpenDrawer}
          setShowListDrawer={setShowListDrawer}
          asoebiCart={asoebiCart}
          // allAsoebi={allItems}
        />

        <Flex justifyContent='space-between' alignItems='center' flexWrap='wrap'>
        {data?.map((item) => 
            <GiftCard
              event={event}
              key={data.indexOf(item)}
              ele={item}
              asoebi={data}
              // allAsoebi={allItems}
              asoebiCart={asoebiCart}
              setAsoebiCart={setAsoebiCart}
            />)}
        </Flex>
      </CartContext.Provider>
    </Box>
  );
};

export default Index;
