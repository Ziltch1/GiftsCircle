import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Button, Text, Image, Heading } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { DeleteGiftItems } from '../../../../../redux/features/gift/service';
import { dispatch } from '../../../../../redux/store';
import itemImage from '../../../../assets/giftItemImage.svg';

const GiftItem = ({ gift, setData }) => {
  const { giftItems } = useSelector(state => state.gift);

  const giftItem = giftItems.find(x => x.id === gift.giftItemId);

  const HandleDelete = () => {
    dispatch(DeleteGiftItems(gift.id, gift.eventId));
    setData(prev => prev.filter(x => x.id !== gift.id));
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
          src={itemImage}
          w="90px"
          h="90px"
          borderRadius={5}
          alt="gift item image"
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
      </Flex>
    </Box>
  );
};

export default GiftItem;
