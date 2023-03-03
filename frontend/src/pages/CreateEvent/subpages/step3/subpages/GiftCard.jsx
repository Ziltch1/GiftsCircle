import { Box, Image, Button, Text, Flex } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import giftImage from '../../../../assets/gift.svg';
import GiftDetails from './GiftDetails';

const GiftCard = ({ openGiftDetails, setOpenGiftDetails }) => {
  const { giftItems } = useSelector(state => state.gift);
  const openDrawer = () => {
    setOpenGiftDetails(true);
  };

  const addGift = () => {
    
  }

  return (
    <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap">
      {openGiftDetails && (
        <GiftDetails setOpenGiftDetails={setOpenGiftDetails} />
      )}
      {giftItems.map(gift => {
        return (
          <Box
            w="285px"
            minH="260px"
            bg="white"
            p="2.5"
            borderRadius={10}
            boxShadow="sm"
            mb="5"
            onClick={openDrawer}
            cursor="pointer"
          >
            <Image
              src={`https://giftcircle-ws.onrender.com/images/giftItems/${gift.image}`}
              w="279"
              h="142px"
              borderRadius={10}
              alt="gift item image"
              display="block"
              mx="auto"
              mb="2.5"
            />
            <Text fontSize={14} fontWeight={400} mb="2" color="#383838">
              {gift.details}
            </Text>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="#27272E" fontWeight={600} fontSize={18}>
                ₦ {gift.amount}
              </Text>
              <Button
                fontSize={13}
                fontWeight={500}
                bg="#00BFB2"
                color="white"
                w="129px"
                h="40px"
                onClick={addGift}
              >
                Add to list
              </Button>
            </Flex>
          </Box>
        );
      })}
    </Flex>
  );
};

export default GiftCard;
