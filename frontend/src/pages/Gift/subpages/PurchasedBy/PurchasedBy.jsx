<<<<<<< HEAD:frontend/src/pages/Gift/subpages/PurchasedFor/subpages/PurchasedFor.jsx
import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState, useContext } from 'react';
import GiftItemList from '../../../components/GiftItemList';
import { useSelector } from 'react-redux';
import { SearchContext } from '../../..';
=======
import React, { useState, useEffect } from 'react';
import { Heading, Text, Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import GiftItemList from '../../components/GiftItemList';
>>>>>>> 9386e92cca906af0771c18b7135d80a755f8a73f:frontend/src/pages/Gift/subpages/PurchasedBy/PurchasedBy.jsx

const PurchasedBy = ({ events }) => {
  const { user } = useSelector(state => state.user);
  const [data, setData] = useState([]);
  const [filtered] = useContext(SearchContext)

  useEffect(() => {
<<<<<<< HEAD:frontend/src/pages/Gift/subpages/PurchasedFor/subpages/PurchasedFor.jsx
    if (filtered.length > 0) {
      let data = filtered.filter(x => x.user_id === user.id);
=======
    if (events.length > 0) {
      let data = events.filter(x => x.user_id !== user.id);
>>>>>>> 9386e92cca906af0771c18b7135d80a755f8a73f:frontend/src/pages/Gift/subpages/PurchasedBy/PurchasedBy.jsx
      setData(data);
    }
  }, [filtered, user]);

  return (
    <Box>
      {filtered?.length < 1 ? (
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
              This is where you will see if any gift has been purchased for you
            </Text>
          </Box>
        </Box>
      ) : (
        <Box w="100%" h="100%">
          {data?.map(event => (
            <GiftItemList key={event.id} event={event} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PurchasedBy;
