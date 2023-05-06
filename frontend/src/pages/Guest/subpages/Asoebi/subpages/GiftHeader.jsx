import React from 'react';
import { Box, Heading, Flex, Button, Image } from '@chakra-ui/react';
import GiftIcon from '../../../../assets/giftIconSmall.svg';


const GiftHeader = ({ setOpenDrawer, setShowListDrawer, giftCount, asoebiCart, complimentaryCart }) => {
  const actionBtns = ['Purchase history', 'Gift list'];

  return (
    <Box mb="5">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading
          mb="5"
          fontWeight={'medium'}
          fontSize={24}
        >{`Gift List (${giftCount})`}</Heading>
        <Box>
          <Button
            bg="#CCF2F0"
            fontSize={14}
            fontWeight="medium"
            h="45px"
            ml="5"
            onClick={() => setShowListDrawer(true)}
          >
            <Image src={GiftIcon} mr="1" /> Gift list ({asoebiCart.length})
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default GiftHeader;
