import { Box, Heading, Text, Image, Flex } from '@chakra-ui/react';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import cartIcon from '../../../../assets/cart.svg';
import GiftListDrawer from './GiftListDrawer';
import BackButton from '../../../../../components/Buttons/BackButton';
import Search from '../../../../../components/Search/Search';
import DisplayCard from '../../../../../components/Card';
import { dispatch } from '../../../../../redux/store';
import { GetGiftItems } from '../../../../../redux/features/gift/service';

export const GiftContext = createContext(null);

const Index = ({ setShowProducts, setShowCheckout }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const { user } = useSelector(state => state.user);
  const { giftItems } = useSelector(state => state.gift);
  const [GiftItems, setGiftItems] = useState([]);
  const [addedGiftItems, setAddedGiftItems] = useState([]);
  const [amount, setAmount] = useState(0);
  const showOptions = () => {
    setShowProducts(false);
  };

  useEffect(() => {
    dispatch(GetGiftItems());
  }, []);

  const contextValue = useMemo(
    () => ({
      giftItems,
      GiftItems,
      addedGiftItems,
      amount,
    }),
    [giftItems, addedGiftItems, amount, GiftItems]
  );
  const AddGift = async id => {
    if (!addedGiftItems.includes(id)) {
      const data = giftItems.find(x => x.id === id);
      const formBody = {
        ItemId: id,
        userId: user.id,
        quantity: 1,
        amountPaid: data.amount,
        status: 'PAID',
        category: 'GIFT',
      };
      setGiftItems(prev => [...prev, formBody]);
      setAddedGiftItems(prev => [...prev, id]);
    }
  };

  useEffect(() => {
    let totalAmount = 0;

    GiftItems.forEach(ele => {
      totalAmount = totalAmount + ele.amountPaid;
    });
    setAmount(totalAmount);
  }, [GiftItems]);

  return (
    <>
      <GiftContext.Provider
        value={{
          ...contextValue,
          setAddedGiftItems,
          setGiftItems,
          setAmount,
        }}
      >
        <GiftListDrawer setShowDrawer={setShowDrawer} setShowCheckout={setShowCheckout} isOpen={showDrawer} />
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
                      {addedGiftItems.length}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            </Box>
            <Box mb="7">
              <Search />
            </Box>
            <Flex gap="24px" alignItems="center" flexWrap="wrap">
              {giftItems.map(item => (
                <DisplayCard
                  id={item.id}
                  data={item}
                  action={AddGift}
                  text="Add to Cart"
                  disabled={addedGiftItems.includes(item.id)}
                />
              ))}
            </Flex>
          </Box>
        </Box>
      </GiftContext.Provider>
    </>
  );
};

export default Index;
