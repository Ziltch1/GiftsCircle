import React, { useState, useEffect } from 'react';
import { Heading, Text, Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import GiftItemList from '../../components/GiftItemList';

const PurchasedFor = ({ events }) => {
  const { user } = useSelector(state => state.user);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (events.length > 0) {
      let data = events.filter(x => x.userId === user.id);
      setData(data);
    }
  }, [events, user]);

  console.log(events, data);

  return (
    <Box>
      {data?.length < 1 ? (
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
        <Box w="100%" minH="500px">
          {data?.map(event => (
            <GiftItemList key={event.id} event={event} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PurchasedFor;
