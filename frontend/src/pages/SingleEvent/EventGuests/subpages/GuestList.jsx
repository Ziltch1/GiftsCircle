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
    Image,
    Flex
} from '@chakra-ui/react'

const GuestList = () => {
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
                        <Flex justifyContent='space-between'>
                            <Box>
                                 <Th>S/N</Th>
                                <Th>Guest name</Th>
                            </Box>

                            <Box>
                                <Th>Date joined</Th>
                            </Box>
                        </Flex>
                      </Tr>
                  </Thead>
                  <Tbody>
                      {gifts.map((gift, index) => {
                          return (
                              <>
                                  <Tr fontSize={14} _hover={{ bg: '#EBFAF9' }}>
                                    <Flex justifyContent='space-between'>
                                        <Box>
                                              <Td>{index + 1}</Td>
                                              <Td><Image src='' />Khadijah AbdulKareem</Td>
                                        </Box>
                                        <Box>
                                              <Td>June 12th, 2022, 9:00am</Td>
                                        </Box>
                                    </Flex>
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

export default GuestList