import React, { useContext, useEffect, useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Button, Text, Image, Heading } from '@chakra-ui/react';
import { CartContext } from '..';
import Counter from '../../../../../components/Counter/Counter';
import { CheckoutContext, DeliveryContext } from '../../..';
import { useSelector } from 'react-redux';

const GiftListItem = ({
  id,
  item,
  amount,
  handleIncrement,
  handleDecrement,
  data,
}) => {
  const { giftItems } = useSelector(state => state.gift);
  const { user } = useSelector(state => state.user);
  const { newEvent } = useSelector(state => state.event);
  const {
    addedGiftItems,
    setAddedGiftItems,
    GiftItems,
    setGiftItems,
    setComplimentaryGiftAmount,
  } = useContext(CartContext);
  const { setNewDeliveryData, newDeliveryData } = useContext(DeliveryContext);
  const { setItemsData } = useContext(CheckoutContext);
  const [newCart, setNewCart] = useState([]);


  const handleDelete = id => {
    const filteredArray = addedGiftItems.filter(obj => obj !== id);
    setAddedGiftItems(filteredArray);
    const filteredGifts = GiftItems.filter(obj => obj.id !== id);
    setGiftItems(filteredGifts);
  };

  const newAmount = amount * data?.quantity;
  setComplimentaryGiftAmount(newAmount);

  useEffect(() => {
    const filteredItemsArray = giftItems.filter(item =>
      GiftItems.some(k => k.giftitemId === item.id)
    );
    setNewDeliveryData(filteredItemsArray);
  }, [GiftItems]);

  const singleItem = newDeliveryData?.map(item => {
    const newData = {
      status: 'PAID',
      userId: user.id,
      eventId: newEvent.id,
      complimentaryGift: data.complimentaryGift,
      amount: item.amount,
      quantity: data.quantity,
      giftId: id,
      amountPaid: data.amountPaid,
    };
    return newData;
  });

  useEffect(() => {
    setItemsData(singleItem);
  }, [newDeliveryData]);

  return (
    <Box
      bg="#FAFAFA"
      p="3"
      mb="4"
      border="1.5px solid #FAFAFA"
      borderRadius={10}
      w="100%"
      _hover={{ border: '1.5px solid #C6C6C6', boxShadow: 'sm' }}
    >
      <Flex gap={3}>
        <Image
          src={item.image}
          w="90px"
          h="90px"
          borderRadius={5}
          alt="gift item image"
          objectFit="cover"
        />
        <Box w="350px">
          <Heading fontWeight="medium" fontSize="14px" lineHeight={6} mb="2">
            {item.details}
          </Heading>
          <Button
            bg="none"
            p="0"
            _hover={{ bg: 'none' }}
            display="flex"
            alignItems="center"
            gap={3}
            color="#F5222D"
            onClick={() => handleDelete(id)}
          >
            <DeleteIcon fontSize={16} />
            <Text fontWeight="medium" fontSize={14}>
              Remove from list
            </Text>
          </Button>
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize={15} mb="2">
            ₦ {amount * data?.quantity}
          </Text>
          <Counter
            quantity={data?.quantity}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
            id={data.giftitemId}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default GiftListItem;
