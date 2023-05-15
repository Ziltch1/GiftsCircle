import React, { useState, useEffect, createContext } from 'react';
import AsoebiHeader from './subpages/AsoebiHeader';
import { Box, Flex } from '@chakra-ui/react';
import AsoebiListDrawer from './subpages/AsoebiListDrawer';
import { GetAddedAsoebiItemsApi } from '../../../../redux/axios/apis/asoebi';
import DisplayCard from '../../../../components/Card';
export const CartContext = createContext(null);

const Index = ({ event }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showListDrawer, setShowListDrawer] = useState(false);
  const [data, setData] = useState([]);
  const [asoebiCart, setAsoebiCart] = useState([]);

  const getAsoebi = async () => {
    try {
      const res = await GetAddedAsoebiItemsApi(event.id);
      const data = await res.data;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAsoebi();
  }, []);

  const addAsoebi = id => {
    setAsoebiCart([...asoebiCart, id]);
  };

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

        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          {data?.map(item => {
            const newData = data?.find(x => x.id === item?.asoebiItem);
            console.log(item, newData)
            return (
              <DisplayCard
                id={item.id}
                data={item}
                action={addAsoebi}
                disabled={asoebiCart.includes(newData?.id)}
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
