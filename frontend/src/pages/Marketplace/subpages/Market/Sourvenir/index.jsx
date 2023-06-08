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
  const showOptions = () => {
    setShowProducts(false);
  };

  useEffect(() => {
    dispatch(GetSourvenirItems());
  }, []);

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
      const formBody = {
        ItemId: id,
        userId: user.id,
        quantity: 1,
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
      totalAmount = totalAmount + ele.amountPaid;
    });
    setAmount(totalAmount);
  }, [SourvenirItems]);
  return (
    <>
      <SourvenirContext.Provider
        value={{
          ...contextValue,
          setAddedSourvernirItems,
          setSourvernirItems,
          setAmount,
        }}
      >
        <GiftListDrawer setShowDrawer={setShowDrawer} isOpen={showDrawer} setShowCheckout={setShowCheckout}/>
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
            <Flex gap="24px" alignItems="center" flexWrap="wrap">
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
