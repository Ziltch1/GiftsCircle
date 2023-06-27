import React, { useContext } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Button, Text, Image, Heading } from '@chakra-ui/react';
import { GiftContext } from '.';
import Counter from '../../../../../components/Counter/Counter';

const GiftListItem = ({ item, id}) => {
  const {
    setGiftItems,
    setAddedGiftItems,
    GiftItems,
    addedGiftItems,
    giftItems, handleIncrement, handleDecrement
  } = useContext(GiftContext);

  const handleDelete = id => {
    const filteredArray = GiftItems.filter(obj => obj.ItemId !== id);
    setGiftItems(filteredArray);

    const filteredItems = addedGiftItems.filter(obj => obj !== id);
    setAddedGiftItems(filteredItems);
  };

  const data = giftItems.find(x => x.id === item.ItemId);


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
          alt="gidata image"
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
