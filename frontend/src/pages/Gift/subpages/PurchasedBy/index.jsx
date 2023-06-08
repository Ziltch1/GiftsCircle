import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import PurchasedBy from './subpages/PurchasedBy';

const index = ({ items }) => {
  console.log(items);
  return (
    <Box>
      {items?.length < 1 ? (
        <Box
          textAlign="center"
          w="100%"
          h="300px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box w="400px">
            <Heading fontWeight="semibold" mb="2" fontSize={30}>
              Gift list is empty
            </Heading>
            <Text color="#8C8C8C" fontSize={16}>
              This is where you will see if any gift has been purchased by you
            </Text>
          </Box>
        </Box>
      ) : (
        <PurchasedBy items={items} />
      )}
    </Box>
  );
};

export default index;
