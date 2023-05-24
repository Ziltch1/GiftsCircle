import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const PurchasedBy = ({ items }) => {
  const { giftItems, complimentaryGifts } = useSelector(state => state.gift);
  const { events } = useSelector(state => state.event);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  });

  return (
    <Box bg="#F5F5F5">
      <Box w="100%" mx="auto" pt="5" pb="5">
        <TableContainer mt="2">
          <Table variant="simple" size="lg">
            <Thead bg="#EEEEEE" borderRadius={5} textTransform="capitalize">
              <Tr borderRadius={5} textTransform="capitalize">
                <Th>Gift name</Th>
                <Th>Event</Th>
                <Th>Date</Th>
                <Th isNumeric>Qty</Th>
                <Th>Amount paid</Th>
                <Th>Payment type</Th>
              </Tr>
            </Thead>
            <Tbody bg="white">
              {items.map(ele => {
                const gift = ele.gift
                  ? giftItems.find(x => x.id === ele.gift.giftItemId)
                  : complimentaryGifts.find(
                      x => x.id === ele.complimentarygiftId
                    );

                const event = events.find(x => x.id === ele.eventId);
                return (
                  <Tr fontSize={14} key={items.indexOf(ele)}>
                    <Td>{gift.title}</Td>
                    <Td>{event.title}</Td>
                    <Td>{new Date(ele.date).toLocaleString()}</Td>
                    <Td isNumeric>{ele.quantity}</Td>
                    <Td>{formatter.format(ele.amount)}</Td>
                    <Td>{ele.giftId ? ele.gift.status : 'COMPLETED'}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default PurchasedBy;
