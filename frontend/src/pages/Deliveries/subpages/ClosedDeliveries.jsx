import React from 'react'
import {
    Box, Table, Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'

const ClosedDeliveries = () => {
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
      <Box mt='8'>
          <TableContainer bg="white">
              <Table variant="simple">
                  <Thead bg="#EEEEEE" px="17px" py="40px">
                      <Tr fontSize={14} color="black">
                          <Th>Gift Name</Th>
                          <Th>Order Date</Th>
                          <Th>Expected delivery date</Th>
                          <Th>Status</Th>
                      </Tr>
                  </Thead>
                  <Tbody>
                      {data.map((gift, index) => {
                          //   const giftItem = giftItems.find(x => x.id === gift.giftItemId);
                          return (
                              <>
                                  <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                                      <Td>Iphone 14 pro max, black color</Td>
                                      <Td>June 12th, 2022, 9:00am</Td>
                                      <Td>June 12th, 2022, 9:00am</Td>
                                      <Td color="#009F94">
                                          Pending
                                      </Td>
                                  </Tr>
                              </>
                          );
                      })}
                  </Tbody>
              </Table>
          </TableContainer>
      </Box>
  )
}

export default ClosedDeliveries