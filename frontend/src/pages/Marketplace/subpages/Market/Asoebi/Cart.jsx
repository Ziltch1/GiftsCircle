import React, { useState, useContext } from 'react';
import CartItem from './CartItem';
import { Box, Heading, Text, Flex, Divider, Button } from '@chakra-ui/react';
import BackButton from '../../../../CreateEvent/subpages/BackButton';
import CloseModal from '../../../CloseModal';
import { AsoebiContext } from '.';

const Cart = ({ setShowAsoebiCart, }) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  const { amount, AsoebiItems } = useContext(AsoebiContext);

  return (
    <>
      {showModal && <CloseModal setShowModal={setShowModal} />}
      <Box minH="600px" w="95%" mx="auto" pt="8" mb="10">
        <BackButton action={() => setShowAsoebiCart(false)} />
        <Box mt="3" mb="10">
          <Heading mb="2" fontWeight={600} fontSize={30}>
            Your Cart
          </Heading>
          <Text color="#717171" fontSize={14}>
            This is where you can buy some things you need for your event for
            your self
          </Text>
        </Box>

        <Box>
          <Flex justifyContent="space-between" alignItems="flex-start">
            <Box
              w="750px"
              bg="white"
              p="5"
              borderRadius={5}
              minH="400px"
              boxShadow="sm"
              border="1px solid #EEEEEE"
            >
              {AsoebiItems.map(item => (
                <CartItem
                  setShowModal={setShowModal}
                  item={item}
                  key={item?.id}
                  data={data}
                  setData={setData}
                />
              ))}
            </Box>
            <Box
              w="350px"
              bg="white"
              borderRadius={5}
              minH="200px"
              boxShadow="sm"
              border="1px solid #EEEEEE"
            >
              <Heading fontSize={18} p="5" fontWeight={600}>
                Cart summary
              </Heading>
              <Divider />
              <Box p="5">
                <Box mb="7">
                  <Text fontSize={13} fontWeight={400} color="#8C8C8C" mb="2">
                    Subtotal
                  </Text>
                  <Heading fontSize={18} fontWeight={600} mb="2">
                    ₦ {amount}
                  </Heading>
                  <Text fontSize={13} fontWeight={400} color="#555555">
                    Delivery fees not included yet.
                  </Text>
                </Box>
                <Box>
                  <Button
                    w="100%"
                    fontSize={13}
                    fontWeight={400}
                    color="white"
                    bg="#00BFB2"
                  >
                    Checkout (<strong>₦ {amount}</strong>)
                  </Button>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Cart;
