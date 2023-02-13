import React from 'react'
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Image,
    Flex
} from '@chakra-ui/react'
import eye from '../../../components/assets/eye.svg'
import message from '../../../components/assets/message.svg'

const GiftLists = () => {
  return (
    <Box>
          <TableContainer bg='white'>
              <Table variant='simple'>
                  <Thead bg='#EEEEEE' px='17px' py='40px'>
                      <Tr fontSize={14} color='black'>
                          <Th>Gift name</Th>
                          <Th>Purchased by</Th>
                          <Th>Complementary Gift</Th>
                          <Th isNumeric>Amount</Th>
                          <Th>Payment status</Th>
                          <Th>Actions</Th>
                      </Tr>
                  </Thead>
                  <Tbody>
                      <Tr fontSize={14}>
                          <Td>Iphone 14 pro max, black color</Td>
                          <Td>Abdullahi Abodunrin</Td>
                          <Td>Yes</Td>
                          <Td isNumeric># 5,500</Td>
                          <Td>Completed</Td>
                          <Td><Flex gap={8}><Image src={eye} /><Image src={message} /></Flex></Td>
                      </Tr>
                      <Tr fontSize={14}>
                          <Td>Iphone 14 pro max, black color</Td>
                          <Td>Abdullahi Abodunrin</Td>
                          <Td>Yes</Td>
                          <Td isNumeric># 5,500</Td>
                          <Td>Completed</Td>
                          <Td><Flex gap={8}><Image src={eye} /><Image src={message} /></Flex></Td>
                      </Tr>
                      <Tr fontSize={14}>
                          <Td>Iphone 14 pro max, black color</Td>
                          <Td>Abdullahi Abodunrin</Td>
                          <Td>Yes</Td>
                          <Td isNumeric># 5,500</Td>
                          <Td>Completed</Td>
                          <Td><Flex gap={8}><Image src={eye} /><Image src={message} /></Flex></Td>
                      </Tr>
                      <Tr fontSize={14}>
                          <Td>Iphone 14 pro max, black color</Td>
                          <Td>Abdullahi Abodunrin</Td>
                          <Td>Yes</Td>
                          <Td isNumeric># 5,500</Td>
                          <Td>Completed</Td>
                          <Td><Flex gap={8}><Image src={eye} /><Image src={message} /></Flex></Td>
                      </Tr>
                      <Tr fontSize={14}>
                          <Td>Iphone 14 pro max, black color</Td>
                          <Td>Abdullahi Abodunrin</Td>
                          <Td>Yes</Td>
                          <Td isNumeric># 5,500</Td>
                          <Td>Completed</Td>
                          <Td><Flex gap={8}><Image src={eye} /><Image src={message} /></Flex></Td>
                      </Tr>
                      <Tr fontSize={14}>
                          <Td>Iphone 14 pro max, black color</Td>
                          <Td>Abdullahi Abodunrin</Td>
                          <Td>Yes</Td>
                          <Td isNumeric># 5,500</Td>
                          <Td>Completed</Td>
                          <Td><Flex gap={8}><Image src={eye} /><Image src={message} /></Flex></Td>
                      </Tr>
                  </Tbody>
              </Table>
          </TableContainer>
    </Box>
  )
}

export default GiftLists