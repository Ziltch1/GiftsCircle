import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

const GiftHeader = () => {
  return (
    <Box>
      <Flex pt="8" justifyContent={'space-between'} alignItems="center" mb="8">
        <Box>
          <Heading size="lg">Gifts</Heading>
        </Box>
      </Flex>
    </Box>
  );
};

export default GiftHeader;
