import React, { useState, useEffect, createContext } from 'react';
import AsoebiHeader from './subpages/AsoebiHeader';
import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import AsoebiCard from './subpages/AsoebiCard';
import AsoebiListDrawer from './subpages/AsoebiListDrawer';
import { GetEventAsoebis } from '../../../../redux/features/events/service';
import { GetAddedAsoebiItemsApi, GetAsoebiItemsApi } from '../../../../redux/axios/apis/asoebi';
export const CartContext = createContext(null);


const Index = ({ event }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showListDrawer, setShowListDrawer] = useState(false);
  const [data, setData] = useState([]);
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
          <AsoebiListDrawer
            setShowListDrawer={setShowListDrawer}
            asoebiCart={asoebiCart}
            setAsoebiCart={setAsoebiCart}
          />
        )}
        <AsoebiHeader
          asoebiCount={data?.length}
          setOpenDrawer={setOpenDrawer}
          setShowListDrawer={setShowListDrawer}
          asoebiCart={asoebiCart}
        />

        <Flex justifyContent='space-between' alignItems='center' flexWrap='wrap'>
        {data?.map((item) => 
            <AsoebiCard
              event={event}
              key={data.indexOf(item)}
              ele={item}
              asoebi={data}
              asoebiCart={asoebiCart}
              setAsoebiCart={setAsoebiCart}
            />)}
        </Flex>
      </CartContext.Provider>
    </Box>
  );
};

export default Index;
