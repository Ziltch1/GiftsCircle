import React, { useContext, useState } from 'react';
import { Box, Heading, Flex, Button, Image, Stack, Text } from '@chakra-ui/react';
import GiftIcon from '../../../../assets/giftIconSmall.svg';
import { CartContext } from '..';

const GiftHeader = ({ setOpenDrawer, setShowListDrawer, position, setPosition }) => {
  const { addedComplimentaryGiftItems, addedGiftItems, data } =
    useContext(CartContext);
    
  return (
    <Box mb="7">
      <Flex justifyContent="space-between" alignItems="center" mb='5'>
        <Heading
          mb="5"
          fontWeight={'medium'}
          fontSize={24}
        >{`Gift List (${data.length})`}</Heading>
        <Box>
          <Button
            bg="#00BFB2"
            color="white"
            fontSize={14}
            fontWeight="medium"
            h="45px"
            onClick={() => setOpenDrawer(true)}
          >
            Add complimentary gift
          </Button>
          <Button
            bg="#CCF2F0"
            fontSize={14}
            fontWeight="medium"
            h="45px"
            ml="5"
            onClick={() => setShowListDrawer(true)}
          >
            <Image src={GiftIcon} mr="1" /> Gift list (
            {addedGiftItems.length + addedComplimentaryGiftItems.length})
          </Button>
        </Box>
      </Flex>
      <Tabs position={position} setPosition={setPosition} />
    </Box>
  );
};

export default GiftHeader;


export const Tabs = ({position, setPosition}) => {
  const options = ['Gifts not enabled for contribution', 'Gifts enabled for contribution'];

  const handleClick = (index) => {
    setPosition(index)
  }

  return (
    <Box>
      <Stack direction='row' spacing={7}>
        {options.map((option, index) => <Text fontSize={14.5} py='8px' px='15px' cursor='pointer' fontWeight='medium' style={index === position ? { color: '#009F94', backgroundColor: '#CCF2F0', borderRadius: '100px'} : null } onClick={() => handleClick(index)}>{option}</Text>)}
      </Stack>
    </Box>
  )
}
