import React, {useState} from 'react'
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
  Flex,
  Text,
  useDisclosure
} from '@chakra-ui/react'


const ReceivedMedia = () => {
  const gifts = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 5,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
  ]

  return (
    <Box>
      <TableContainer bg='white'>
        <Table variant='simple'>
          <Thead bg='#EEEEEE' px='17px' py='40px'>
            <Tr fontSize={14} color='black'>
              <Th>S/N</Th>
              <Th>Gift name</Th>
              <Th>Seen by</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {gifts.map((gift, index) => {
              return (
                <>
                  <Tr fontSize={14} _hover={{ bg: '#FAFAFA'}}>
                    <Td>{index + 1}</Td>
                    <Td>Image {index + 1}</Td>
                    <Td>Guest and Public</Td>
                    <Td color='#009F94'><Flex gap={8}><Text>View</Text><Text>Change</Text></Flex></Td>
                  </Tr>
                </>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ReceivedMedia