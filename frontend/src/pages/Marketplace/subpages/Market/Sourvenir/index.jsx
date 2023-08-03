import { Box, Heading, Text, Image, Flex } from '@chakra-ui/react';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import cartIcon from '../../../../assets/cart.svg';
import GiftListDrawer from './GiftListDrawer';
import BackButton from '../../../../../components/Buttons/BackButton';
import Search from '../../../../../components/Search/Search';
import DisplayCard from '../../../../../components/Card';
import { dispatch } from '../../../../../redux/store';
import { GetSourvenirItems } from '../../../../../redux/features/gift/service';

export const SourvenirContext = createContext(null);

const Index = ({ setShowProducts, setShowCheckout }) => {
  const { user } = useSelector(state => state.user);
  const { sourvernirItems } = useSelector(state => state.gift);
  const [showDrawer, setShowDrawer] = useState(false);
  const [SourvenirItems, setSourvernirItems] = useState([]);
  const [addedSourvernirItems, setAddedSourvernirItems] = useState([]);
  const [amount, setAmount] = useState(0);
  const { checkoutData } = useSelector(state => state.market);
  const [quantity, setQuantity] = useState(1);

  const showOptions = () => {
    setShowProducts(false);
  };

  useEffect(() => {
    dispatch(GetSourvenirItems());
  }, []);

  useEffect(() => {
    const { data } = checkoutData;
    console.log(data);
    setSourvernirItems([...data]);
    const ids = [];
    data.forEach(x => ids.push(x.ItemId));
    setAddedSourvernirItems([...ids]);
  }, [checkoutData]);

  const contextValue = useMemo(
    () => ({
      sourvernirItems,
      SourvenirItems,
      addedSourvernirItems,
      amount,
    }),
    [sourvernirItems, addedSourvernirItems, amount, SourvenirItems]
  );

  const AddSourvenir = async id => {
    if (!addedSourvernirItems.includes(id)) {
      const data = sourvernirItems.find(x => x.id === id);
      console.log(SourvenirItems);
      if (SourvenirItems.length > 0) {
        const newSourvenirItem = SourvenirItems?.find(x => x?.ItemId === id);
        setQuantity(newSourvenirItem?.quantity);
      }
      const formBody = {
        ItemId: id,
        userId: user.id,
        quantity: quantity ? quantity : 1,
        amountPaid: data.amount,
        status: 'PAID',
        category: 'SOURVENIR',
      };
      setSourvernirItems(prev => [...prev, formBody]);
      setAddedSourvernirItems(prev => [...prev, id]);
    }
  };

  useEffect(() => {
    let totalAmount = 0;
    SourvenirItems.forEach(ele => {
      totalAmount = totalAmount + (ele.amountPaid * ele.quantity);
    });
    setAmount(totalAmount);
  }, [SourvenirItems]);

  const handleIncrement = id => {
    setSourvernirItems(prevItems =>
      prevItems.map(item =>
        item.ItemId === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = id => {
    setSourvernirItems(prevItems =>
      prevItems.map(item =>
        item.ItemId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <>
      <SourvenirContext.Provider
        value={{
          ...contextValue,
          setAddedSourvernirItems,
          setSourvernirItems,
          setAmount,
          handleIncrement,
          handleDecrement,
          quantity,
        }}
      >
        <GiftListDrawer
          setShowDrawer={setShowDrawer}
          isOpen={showDrawer}
          setShowCheckout={setShowCheckout}
        />
        <Box bg="#F5F5F5">
          <Box minH="600px" w="100%" mx="auto" pt="8">
            <BackButton action={showOptions} />
            <Box mb="8" mt="5">
              <Flex justifyContent="space-between" alignItems="center">
                <Box>
                  <Heading fontSize={30} mb="2">
                    Marketplace
                  </Heading>
                  <Text fontSize={14} color="#717171">
                    This is where you can buy some things you need for your
                    event for your self
                  </Text>
                </Box>

                <Box
                  bg="#CCF2F0"
                  w="155px"
                  h="45px"
                  py="3"
                  px="6"
                  cursor="pointer"
                  borderRadius={5}
                  onClick={() => setShowDrawer(true)}
                >
                  <Flex gap={2} fontSize={14}>
                    <Image src={cartIcon} />
                    <Text>Cart</Text>
                    <Text
                      bg="#00BFB2"
                      color="white"
                      w="33px"
                      h="21px"
                      borderRadius="100px"
                      textAlign="center"
                      pb="4px"
                      px="3px"
                    >
                      {addedSourvernirItems.length}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <Box mb="7">
              <Search />
            </Box>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              {sourvernirItems.map(item => (
                <DisplayCard
                  id={item.id}
                  data={item}
                  action={AddSourvenir}
                  disabled={addedSourvernirItems.includes(item.id)}
                  text="Add to Cart"
                />
              ))}
            </Flex>
          </Box>
        </Box>
      </SourvenirContext.Provider>
    </>
  );
};

export default Index;
