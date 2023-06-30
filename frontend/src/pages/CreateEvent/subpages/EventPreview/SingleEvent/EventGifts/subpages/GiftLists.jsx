import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const GiftLists = ({ data }) => {
  const { giftItems } = useSelector(state => state.gift);
  return (
    <Box>
      <TableContainer bg="white">
        <Table variant="simple">
          <Thead bg="#EEEEEE" px="17px" py="40px">
            <Tr fontSize={14} color="black">
              <Th>S/N</Th>
              <Th>Gift name</Th>
              <Th>Quantity purchased</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((gift, index) => {
              const giftItem = giftItems.find(x => x.id === gift.giftItemId);
              return (
                <>
                  <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                    <Td>{index + 1}</Td>
                    <Td>{giftItem.title}</Td>
                    <Td>1</Td>
                  </Tr>
                </>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GiftLists;
