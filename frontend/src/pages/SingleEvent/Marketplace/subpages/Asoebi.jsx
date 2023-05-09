import React from 'react'
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

const Asoebi = () => {
    const data = [0,1,2,3,4,5,6,7]
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
                        //   const giftItem = giftItems.find(x => x.id === gift.giftItemId);
                          return (
                              <>
                                  <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                                      <Td>{index + 1}</Td>
                                      <Td>Ankara and gele</Td>
                                      <Td>5</Td>
                                      <Td color="#009F94">
                                        Purchased for naming ceremony event
                                          {/* {gift.purchased ? 'Purchased' : 'Available'} */}
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

export default Asoebi