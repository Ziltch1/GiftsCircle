import React, { useContext } from 'react';
import { Box, Heading, Flex, Button, Image } from '@chakra-ui/react';
import GiftIcon from '../../../../assets/giftIconSmall.svg';
import { CartContext } from '..';

const AsoebiHeader = ({ setShowListDrawer }) => {
  const { addedAsoebiItems, data } = useContext(CartContext);

  return (
    <Box mb="5">
      <Flex justifyContent="space-between" alignItems="center">
        <Heading
          mb="5"
          fontWeight={'medium'}
          fontSize={24}
        >{`Asoebi List (${data.length})`}</Heading>
        <Box>
          <Button
            bg="#CCF2F0"
            fontSize={14}
            fontWeight="medium"
            h="45px"
            ml="5"
            onClick={() => setShowListDrawer(true)}
          >
            <Image src={GiftIcon} mr="1" /> Asoebi list (
            {addedAsoebiItems.length})
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default AsoebiHeader;
