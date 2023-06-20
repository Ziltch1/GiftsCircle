import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect, useState, useContext } from 'react';
import GiftItemList from '../../../components/GiftItemList';
import { useSelector } from 'react-redux';
import { SearchContext } from '../../..';

const PurchasedFor = ({ events }) => {
  const { user } = useSelector(state => state.user);
  const [data, setData] = useState([]);
  const [filtered] = useContext(SearchContext)

  useEffect(() => {
    if (filtered.length > 0) {
      let data = filtered.filter(x => x.user_id === user.id);
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
              This is where you will see if any gift has been purchsed for you
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

export default PurchasedFor;
