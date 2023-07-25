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
    <Box mt='8' display='flex' alignItems='center' justifyContent='center'>
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
              <TableContainer bg="white" w='100%'>
                  <Table variant="simple">
                      <Thead bg="#EEEEEE" px="17px" py="40px">
                          <Tr fontSize={14} color="black">
                              <Th>Gift Name</Th>
                              <Th>Order Date</Th>
                              <Th>Expected delivery date</Th>
                              <Th>Status</Th>
                              <Th>Delivery Fee</Th>
                          </Tr>
                      </Thead>
                      <Tbody>
                          {deliveries.map((gift, index) => {
                            const orderDate = new Date(gift?.created_at).toDateString();
                            const expectedDate = new Date(gift?.expectedDate).toDateString();
                              return (
                                  <>
                                      <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }} key={gift.id}>
                                          <Td>{gift.item}</Td>
                                          <Td>{orderDate}</Td>
                                          <Td>{expectedDate}</Td>
                                          <Td color="#009F94" textTransform='capitalize'>
                                              {gift.status.toLowerCase()}
                                          </Td>
                                          <Td>₦{gift.deliveryFee}</Td>
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