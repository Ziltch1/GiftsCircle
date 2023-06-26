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
import Search from '../../../components/Search/Search';
import BackButton from '../../../components/Buttons/BackButton';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../redux/store';
import SkeletonLoader from '../../../components/Skeleton';
import {
  GetEventGiftsTransactions,
  GetUserEventGiftsTransactions,
} from '../../../redux/features/gift/service';
import {
  setEventGiftsTrans,
  setUserEventGiftTrans,
} from '../../../redux/features/gift/giftSlice';

export default function GiftDetails() {
  const navigate = useNavigate();
  const [currentEvent, setCurrentEvent] = useState([]);
  const { id } = useParams();
  const { events } = useSelector(state => state.event);
  const { user } = useSelector(state => state.user);
  const { giftItems, eventGiftTrans, userEventGiftTrans, complimentaryGifts } =
    useSelector(state => state.gift);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (events) {
      let CurrentEvent = events?.filter(x => x.id === id)[0];
      if (CurrentEvent.user_id === user.id) {
        dispatch(GetEventGiftsTransactions(id));
      } else {
        dispatch(GetUserEventGiftsTransactions(user.id, id));
      }
      setCurrentEvent(CurrentEvent);
    }
  }, [id, events]);

  useEffect(() => {
    if (eventGiftTrans && currentEvent.user_id === user.id) {
      setLoading(false);
      setData(eventGiftTrans);
    }
    if (userEventGiftTrans && currentEvent.user_id !== user.id) {
      setLoading(false);
      setData(userEventGiftTrans);
    }
  }, [eventGiftTrans, userEventGiftTrans]);

  return (
    <Box bg="#F5F5F5">
      <Box w="85%" mx="auto" pt="10" pb="5">
        <BackButton
          action={() => {
            navigate(-1);
            dispatch(setEventGiftsTrans(null));
            dispatch(setUserEventGiftTrans(null));
          }}
        />
        <Heading mb="7" mt="5" fontWeight="bold" fontSize={25}>
          {currentEvent?.title}
        </Heading>
        <Search />
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            {data.length === 0 ? (
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
                      <Th>Date</Th>
                      <Th isNumeric>Qty</Th>
                      <Th>Payment status</Th>
                      <Th>Amount left</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody bg="white">
                    {data.map(ele => {
                      const gift = ele.giftId
                        ? giftItems.find(x => x.id === ele.gift.giftItemId)
                        : complimentaryGifts.find(
                          x => x.id === ele.complimentaryGift.id
                        );
                      return (
                        <Tr fontSize={13} textAlign="center" key={ele.id}>
                          <Td>{gift?.title}</Td>
                          <Td>June 12th, 2022</Td>
                          <Td>{ele?.quantity}</Td>
                          <Td>{ele?.gift ? ele.gift.status : 'COMPLETED'}</Td>
                          <Td isNumeric>
                            {parseInt(gift?.amount) - ele?.amount}
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