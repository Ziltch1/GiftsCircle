import { Box, Heading, Text, Image, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cartIcon from '../../../../assets/cart.svg';
import GiftListDrawer from './GiftListDrawer';
import BackButton from '../../../../../components/Buttons/BackButton';
import Search from '../../../../../components/Search/Search';
import DisplayCard from '../../../../../components/Card';
import { AddGiftApi } from '../../../../../redux/axios/apis/gift';
import { dispatch } from '../../../../../redux/store';
import { GetGiftItems } from '../../../../../redux/features/gift/service';

const Index = ({ setShowProducts, data, cart, setCart }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const showOptions = () => {
    setShowProducts(false);
  };

  useEffect(() => {
    dispatch(GetGiftItems());
  }, []);

  const { user } = useSelector(state => state.user);

  const AddGift = async id => {
    let amount = data.find(x => x.id === id).amount;
    if (!cart.includes(id)) {
      const formBody = {
        userId: user.id,
        amount: amount,
        quantity: 1,
        giftItemId: id,
      };
      try {
        // await AddGiftApi(formBody);
      } catch (error) {
        console.log(error);
      }
      setCart([...cart, id]);
    }
  };

  return (
    <>
      {showDrawer && (
        <GiftListDrawer
          cart={cart}
          data={data}
          setCart={setCart}
          setShowDrawer={setShowDrawer}
        />
      )}
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
                  This is where you can buy some things you need for your event
                  for your self
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
                    {cart.length}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          </Box>
          <Box mb="7">
            <Search />
          </Box>
          <Flex gap="24px" alignItems="center" flexWrap="wrap">
            {data.map(item => (
              <DisplayCard
                id={item.id}
                data={item}
                action={AddGift}
                text="Add to Cart"
                disabled={cart.includes(item.id)}
              />
            ))}
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Index;
