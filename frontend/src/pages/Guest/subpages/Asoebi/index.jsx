import React, { useState, createContext } from 'react';
import AsoebiHeader from './subpages/AsoebiHeader';
import { Box, Flex } from '@chakra-ui/react';
import AsoebiListDrawer from './subpages/AsoebiListDrawer';
import DisplayCard from '../../../../components/Card';
import { useSelector } from 'react-redux';
export const CartContext = createContext(null);

const Index = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showListDrawer, setShowListDrawer] = useState(false);
  const [asoebiCart, setAsoebiCart] = useState([]);
  const { asoebiItems, eventAsoebis } = useSelector(state => state.event);
  const [data, setData] = useState([]);

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
          {eventAsoebis?.map(item => {
            const newData = asoebiItems?.find(x => x.id === item?.asoebiItem);
            return (
              <DisplayCard
                id={item.id}
                data={newData}
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
