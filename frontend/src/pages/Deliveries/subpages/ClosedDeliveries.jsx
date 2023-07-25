import React from 'react'
import {
    Box, Table, Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer, Text, Heading
} from '@chakra-ui/react'

const ClosedDeliveries = ({deliveries}) => {
    const closedDeliveries = deliveries.filter(delivery => delivery.status === 'delivered')
  return (
      <Box mt='8' display='flex' alignItems='center' justifyContent='center'>
          {closedDeliveries.length < 1 ?
              <Box textAlign='center' maxW='400px' mt='10'>
                  <Heading fontWeight="semibold" mb="2.5" fontSize={30}>
                      Delivery list is empty
                  </Heading>
                  <Text color="#8C8C8C" fontSize={16} lineHeight={7}>
                      You have no closed deliveries yet. The delivery status of all items you ordered will be dislayed here.
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
                          {closedDeliveries.map((gift, index) => {
                              //   const giftItem = giftItems.find(x => x.id === gift.giftItemId);
                              return (
                                  <>
                                      <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }} key={gift.id}>
                                          <Td>Iphone 14 pro max, black color</Td>
                                          <Td>June 12th, 2022, 9:00am</Td>
                                          <Td>June 12th, 2022, 9:00am</Td>
                                          <Td color="#009F94">
                                              Pending
                                          </Td>
                                          <Td>₦5000</Td>
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

export default ClosedDeliveries