import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Button, Text, Image, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DeleteGiftItems } from '../../../../../redux/features/gift/service';
import { dispatch } from '../../../../../redux/store';
import itemImage from '../../../../assets/giftItemImage.svg';

const GiftItem = ({ gift, setData, setAddedGiftItems, setGiftItems}) => {
  const { giftItems } = useSelector(state => state.gift);
  const giftItem = giftItems.find(x => x.id === gift.giftItemId);

  const HandleDelete = () => {
    if (gift.id) {
      dispatch(DeleteGiftItems(gift.id, gift.eventId));
      setData(prev => prev.filter(x => x.id !== gift.id));
      setAddedGiftItems(prev => prev.filter(x => x !== giftItem.id));
    } else {
      setData(prev => prev.filter(x => x.giftItemId !== giftItem.id));
      setAddedGiftItems(prev => prev.filter(x => x !== giftItem.id));
      setGiftItems(prev => prev.filter(x => x.giftItemId !== giftItem.id));
    }
  };
  

  return (
    <Box
      bg="#FAFAFA"
      p="3"
      mb="4"
      border="1.5px solid #FAFAFA"
      borderRadius={10}
      _hover={{ border: '1.5px solid #C6C6C6', boxShadow: 'sm' }}
    >
      <Flex gap={3}>
        <Image
          src={giftItem.image}
          w="90px"
          h="90px"
          borderRadius={5}
          alt="gift item image"
          objectFit='cover'
        />
        <Box w="390px">
          <Heading fontWeight="medium" fontSize="15px" lineHeight={6}>
            {giftItem.title}
          </Heading>
          <Button
            bg="none"
            p="0"
            _hover={{ bg: 'none' }}
            display="flex"
            alignItems="center"
            gap={3}
            color="#F5222D"
            onClick={() => HandleDelete()}
          >
            <DeleteIcon fontSize={17} />
            <Text fontWeight="medium" fontSize={15}>
              Remove from list
            </Text>
          </Button>
        </Box>

        <Box>
          <Text>₦{giftItem.amount}</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default GiftItem;
