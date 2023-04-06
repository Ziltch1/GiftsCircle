import { Box, Text, Heading, Button, Image, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GiftIcon from '../../../assets/giftIcon.svg';
import GiftDrawer from './subpages/GiftDrawer';

const GiftHeader = ({
  setOpenDrawer,
  openDrawer,
  giftItems,
  setAddedGiftItems,
  setGiftItems,
}) => {
  const { eventGifts } = useSelector(state => state.event);
  const [data, setData] = useState([]);
  const showDrawer = () => {
    setOpenDrawer(true);
  };

  useEffect(() => {
    if (eventGifts) {
      setData([...eventGifts, ...giftItems]);
    }
  }, [eventGifts, giftItems]);

  return (
    <Box my="5">
      {openDrawer && (
        <GiftDrawer
          setOpenDrawer={setOpenDrawer}
          data={data}
          setData={setData}
          setAddedGiftItems={setAddedGiftItems}
          setGiftItems={setGiftItems}
        />
      )}
      <Flex mb="5" alignItems="center" justifyContent="space-between">
        <Box>
          <Heading mb="2" fontWeight="medium" fontSize={30}>
            Add your gift list
          </Heading>
          <Text color="#717171" fontSize={14}>
            Add list of gift you would like for people to purchase for you...
          </Text>
        </Box>
        <Box>
          <Flex alignItems="center" gap={4}>
            <Button
              fontSize={14}
              fontWeight="medium"
              w="170px"
              h="44px"
              display="flex"
              alignItems="center"
              justifyContent="space-around"
              bg="#CCF2F0"
              boxShadow="0px 8px 30px rgba(0, 191, 178, 0.1)"
              onClick={showDrawer}
            >
              <Image src={GiftIcon} ali="gift icon" w="20px" h="20px" />
              <Text>Gift list</Text>
              <Text
                bg="#00BFB2"
                color="white"
                p="3"
                borderRadius="100px"
                w="29px"
                h="19px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {data.length}
              </Text>
            </Button>
            <Button
              bg="#00BFB2"
              w="170px"
              h="44px"
              color="white"
              fontSize={14}
              fontWeight="medium"
              boxShadow="0px 8px 30px rgba(0, 191, 178, 0.1)"
            >
              Request for an item
            </Button>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default GiftHeader;
