import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import GiftItemList from './GiftItemList';

const PurchasedFor = ({ events }) => {
  return (
    <Box>
      {events?.length < 1 ? (
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
              This is where you will see if any gift has been purchsed for you
            </Text>
          </Box>
        </Box>
      ) : (
        <Box w="100%" h="100%">
          {events?.map(event => (
            <GiftItemList key={event.id} event={event} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PurchasedFor;
