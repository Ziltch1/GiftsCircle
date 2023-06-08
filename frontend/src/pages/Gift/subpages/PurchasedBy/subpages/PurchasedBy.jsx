import React, {useState, useEffect} from 'react';
import {
  Heading, Text,
  Box,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import GiftItemList from '../../../components/GiftItemList';

const PurchasedBy = ({ items }) => {
  const { giftItems, complimentaryGifts } = useSelector(state => state.gift);
  const { events } = useSelector(state => state.event);
  const { user } = useSelector(state => state.user);
  const [data, setData] = useState([]);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  });

  useEffect(() => {
    if (events.length > 0) {
      let data = events.filter(x => x.user_id === user.id);
      setData(data);
    }
  }, [events, user]);

  // items.map(ele => {
  //   const gift = ele.gift
  //     ? giftItems.find(x => x.id === ele.gift.giftItemId)
  //     : complimentaryGifts.find(
  //       x => x.id === ele.complimentarygiftId
  //     );

  //   const event = events.find(x => x.id === ele.eventId);

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
          {data?.map(event => (
            <GiftItemList key={event.id} event={event} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PurchasedBy;

