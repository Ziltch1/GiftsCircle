import {
    Box, Table, Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer, Text, Heading } from '@chakra-ui/react'
import React from 'react'


const OpenDeliveries = ({deliveries}) => {
  
  return (
    <Box mt='8' minH='400px' display='flex' alignItems='center' justifyContent='center'>
        {deliveries.length < 1 ? 
              <Box textAlign='center' maxW='400px'>
                  <Heading fontWeight="semibold" mb="2.5" fontSize={30}>
                      Delivery list is empty
                  </Heading>
                  <Text color="#8C8C8C" fontSize={16} lineHeight={7}>
                      You have no pending deliveries yet. The delivery status of all items you ordered will be dislayed here.
                  </Text>
              </Box>
                :
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
                          {deliveries.map((gift, index) => {
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
        }
    </Box>
  )
}

export default OpenDeliveries