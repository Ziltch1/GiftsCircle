import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
} from '@chakra-ui/react';
import Search from '../../components/Search/Search';
import BackButton from '../../components/Buttons/BackButton';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { dispatch } from '../../redux/store';
import { GetEventGifts } from '../../redux/features/events/service';
import SkeletonLoader from '../../components/Skeleton';

export default function GiftDetails() {
  const navigate = useNavigate();
  const [currentEvent, setCurrentEvent] = useState([]);
  const { id } = useParams();
  const { eventGifts, events } = useSelector(state => state.event);
  const { giftItems } = useSelector(state => state.gift);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(GetEventGifts(id));

    setCurrentEvent(events.filter(x => x.id === id)[0]);
  }, [id, events]);

  useEffect(() => {
    if (eventGifts) {
      setLoading(false);
    }
  }, [eventGifts]);

  return (
    <Box bg="#F5F5F5">
      <Box w="85%" mx="auto" pt="10" pb="5">
        <BackButton action={() => navigate(-1)} />
        <Heading mb="7" mt="5" fontWeight="bold" fontSize={25}>
          {currentEvent?.title}
        </Heading>
        <Search />
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            {eventGifts.length === 0 ? (
              <Box h="100vh">
                <Heading
                  textAlign="center"
                  mt="10"
                  fontWeight={600}
                  fontSize={30}
                >
                  Sorry! you don't have any gifts yet
                </Heading>
              </Box>
            ) : (
              <TableContainer mt="8">
                <Table variant="simple" size="lg">
                  <Thead
                    bg="#EEEEEE"
                    borderRadius={5}
                    textTransform="capitalize"
                  >
                    <Tr borderRadius={5} textTransform="capitalize">
                      <Th>Name</Th>
                      <Th>Purchased by</Th>
                      <Th>Date</Th>
                      <Th isNumeric>Qty</Th>
                      <Th>Payment status</Th>
                      <Th>Amount left</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody bg="white">
                    {eventGifts.map(ele => {
                      const giftItem = giftItems.filter(
                        x => x.id === ele.giftItemId
                      )[0];
                      return (
                        <Tr fontSize={13} textAlign="center" key={ele.id}>
                          <Td>{giftItem.title}</Td>
                          <Td>Taiwo</Td>
                          <Td>June 12th, 2022</Td>
                          <Td>{ele.quantity}</Td>
                          <Td>{ele.status}</Td>
                          <Td isNumeric>
                            {parseInt(giftItem.amount) - ele.amountPaid}
                          </Td>
                          <Td>Complete payment</Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
