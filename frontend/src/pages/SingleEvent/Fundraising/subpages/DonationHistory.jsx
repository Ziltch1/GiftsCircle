import {
    Heading, Box, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, } from '@chakra-ui/react'
import React from 'react'

const DonationHistory = () => {
  return (
    <Box>
        <Heading mb='4' fontSize={24} fontWeight={500}>Donation History</Heading>
        <Box>
              <TableContainer bg='white'>
                  <Table variant='simple'>
                      <Thead bg='#EEEEEE' fontSize={14}>
                          <Tr>
                              <Th>S/N</Th>
                              <Th>Guest name</Th>
                              <Th>Amount paid</Th>
                              <Th>Date paid</Th>
                          </Tr>
                      </Thead>
                      <Tbody>
                          <Tr fontSize={14}> 
                              <Td>1</Td>
                              <Td>Khadijat Abdulkareem</Td>
                              <Td>₦ 12,000</Td>
                              <Td>June 12th, 2022, 9:00am</Td>
                          </Tr>
                          <Tr fontSize={14}>
                              <Td>1</Td>
                              <Td>Khadijat Abdulkareem</Td>
                              <Td>₦ 12,000</Td>
                              <Td>June 12th, 2022, 9:00am</Td>
                          </Tr>
                          <Tr fontSize={14}>
                              <Td>1</Td>
                              <Td>Khadijat Abdulkareem</Td>
                              <Td>₦ 12,000</Td>
                              <Td>June 12th, 2022, 9:00am</Td>
                          </Tr>
                          <Tr fontSize={14}>
                              <Td>1</Td>
                              <Td>Khadijat Abdulkareem</Td>
                              <Td>₦ 12,000</Td>
                              <Td>June 12th, 2022, 9:00am</Td>
                          </Tr>
                          <Tr fontSize={14}>
                              <Td>1</Td>
                              <Td>Khadijat Abdulkareem</Td>
                              <Td>₦ 12,000</Td>
                              <Td>June 12th, 2022, 9:00am</Td>
                          </Tr>
                      </Tbody>
                  </Table>
              </TableContainer>
        </Box>
    </Box>
  )
}

export default DonationHistory