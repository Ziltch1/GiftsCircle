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

const PurchasedBy = ({ items }) => {
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
                return (
                  <Tr fontSize={14} key={items.indexOf(ele)}>
                    <Td>Iphone 14 pro max,</Td>
                    <Td>Wedding of Mr. Adejumo</Td>
                    <Td>June 20 2022, 8:45am</Td>
                    <Td isNumeric>4</Td>
                    <Td>₦ 155,000</Td>
                    <Td>Partial</Td>
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
