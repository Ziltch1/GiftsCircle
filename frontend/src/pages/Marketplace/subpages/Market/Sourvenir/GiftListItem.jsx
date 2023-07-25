import React, { useContext, useEffect } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Button, Text, Image, Heading } from '@chakra-ui/react';
import { SourvenirContext } from '.';
import Counter from '../../../../../components/Counter/Counter';
import { DeliveryContext } from '../../..';

const GiftListItem = ({ item, id }) => {
  const {
    setSourvernirItems,
    setAddedSourvernirItems,
    SourvenirItems,
    addedSourvernirItems,
    sourvernirItems, handleIncrement, handleDecrement
  } = useContext(SourvenirContext);

  const { setNewDeliveryData, newDeliveryData } = useContext(DeliveryContext);

  const handleDelete = id => {
    const filteredArray = SourvenirItems.filter(obj => obj.ItemId !== id);
    setSourvernirItems(filteredArray);

    const filteredItems = addedSourvernirItems.filter(obj => obj !== id);
    setAddedSourvernirItems(filteredItems);
  };

  const data = sourvernirItems.find(x => x.id === item.ItemId);

  useEffect(() => {
    const filteredItemsArray = sourvernirItems.filter(item => addedSourvernirItems.includes(item.id));
    setNewDeliveryData(filteredItemsArray);
  }, [addedSourvernirItems]);

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
          src={data?.image}
          w="90px"
          h="90px"
          borderRadius={5}
          alt="gift item image"
          objectFit="cover"
        />
        <Box w="350px">
          <Heading fontWeight="medium" fontSize="14px" lineHeight={6} mb="2">
            {data?.details}
          </Heading>
          <Button
            bg="none"
            p="0"
            _hover={{ bg: 'none' }}
            display="flex"
            alignItems="center"
            gap={3}
            color="#F5222D"
            onClick={() => handleDelete(item?.ItemId)}
          >
            <DeleteIcon fontSize={16} />
            <Text fontWeight="medium" fontSize={14}>
              Remove from list
            </Text>
          </Button>
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize={15} mb='3'>
            ₦ {item?.quantity ? data?.amount * item?.quantity : data?.amount}
          </Text>
          <Counter quantity={item?.quantity} handleIncrement={handleIncrement} handleDecrement={handleDecrement} id={id} />
        </Box>
      </Flex>
    </Box>
  );
};

export default GiftListItem;
