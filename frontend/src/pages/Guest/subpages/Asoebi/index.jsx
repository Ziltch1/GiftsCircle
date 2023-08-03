import React, { useState, createContext, useMemo } from 'react';
import AsoebiHeader from './subpages/AsoebiHeader';
import { Box, Flex } from '@chakra-ui/react';
import AsoebiListDrawer from './subpages/AsoebiListDrawer';
import DisplayCard from '../../../../components/Card';
import { useSelector } from 'react-redux';
export const CartContext = createContext(null);
export const DeliveryContext = createContext(null);

const Index = () => {
  const [showListDrawer, setShowListDrawer] = useState(false);
  const { asoebiItems, eventAsoebis } = useSelector(state => state.event);
  const [data, setData] = useState([]);
  const [AsoebiItems, setAsoebiItems] = useState([]);
  const [addedAsoebiItems, setAddedAsoebiItems] = useState([]);
  const [amount, setAmount] = useState(0);
  const [showAsoebiCheckout, setShowAsoebiCheckout] = useState(false);
  const [buyItems, setBuyItems] = useState('');
  const [newDeliveryData, setNewDeliveryData] = useState([]);
  const [deliveryData, setDeliveryData] = useState([]);

  const addAsoebi = id => {
    let newItem = eventAsoebis.find(x => x.asoebiItem === id);
    if (!addedAsoebiItems.includes(newItem.id)) {
      setAsoebiItems([...AsoebiItems, newItem]);
      setAddedAsoebiItems([...addedAsoebiItems, newItem.id]);
    }
  };

  const contextValue = useMemo(
    () => ({
      data: [...eventAsoebis],
      AsoebiItems,
      addedAsoebiItems,
      amount,
      asoebiItems,
    }),
    [AsoebiItems, addedAsoebiItems, amount, eventAsoebis, asoebiItems]
  );

  return (
    <Box>
      <DeliveryContext.Provider value={{ newDeliveryData, setNewDeliveryData, deliveryData, setDeliveryData }}>
      <CartContext.Provider
        value={{
          ...contextValue,
          setAddedAsoebiItems,
          setAsoebiItems,
          setData,
          setAmount,
          setBuyItems,
          setShowAsoebiCheckout, showAsoebiCheckout, setShowListDrawer,
        }}
      >
        {showListDrawer && (
          <AsoebiListDrawer setShowListDrawer={setShowListDrawer} setShowAsoebiCheckout={setShowAsoebiCheckout} setBuyItems={setBuyItems}  />
        )}
        <AsoebiHeader setShowListDrawer={setShowListDrawer} />

        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          {eventAsoebis?.map(item => {
            const newData = asoebiItems?.find(x => x.id === item?.asoebiItem);
            let data = { ...newData };
            return (
              <DisplayCard
                id={item.id}
                data={data}
                action={addAsoebi}
                disabled={addedAsoebiItems.includes(item.id)}
                text="Purchase"
                increment={item.increment}
              />
            );
          })}
        </Flex>
      </CartContext.Provider>
      </DeliveryContext.Provider>
    </Box>
  );
};

export default Index;
