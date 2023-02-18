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
    useDisclosure
} from '@chakra-ui/react'
import eye from '../../../../components/assets/eye.svg'
import message from '../../../../components/assets/message.svg'
import axios from 'axios'
import GiftDrawer from '../../../../components/Drawer/Drawer'

const PurchaseHistory = () => {
  const eventId = '';
  const [showDrawer, setShowDrawer] = useState(false);
  const openDrawer = () => {
    setShowDrawer(true);
  }

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
                          <Th>Gift name</Th>
                          <Th>Purchased by</Th>
                          <Th>Complementary Gift</Th>
                          <Th isNumeric>Amount</Th>
                          <Th>Payment status</Th>
                          <Th>Actions</Th>
                      </Tr>
                  </Thead>
                  <Tbody>
                      {gifts.map((gift) => {
                        return (
                            <>
                                <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                                    <Td>Iphone 14 pro max, black color</Td>
                                    <Td>Abdullahi Abodunrin</Td>
                                    <Td>Yes</Td>
                                    <Td isNumeric># 5,500</Td>
                                    <Td>Completed</Td>
                                    <Td><Flex gap={8}><Image src={eye} onClick={openDrawer} /><Image src={message} /></Flex></Td>
                                </Tr>
                            </>
                        )
                      })}
                  </Tbody>
              </Table>
          </TableContainer>
          {showDrawer ? <GiftDrawer /> : null}
    </Box>
  )
}

export default PurchaseHistory