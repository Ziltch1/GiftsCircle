import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetUserPurchasedGifts } from '../../../../redux/features/gift/service';
import { dispatch } from '../../../../redux/store';
import {
  Box, Text, Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, Skeleton, Heading, Stack
} from "@chakra-ui/react";


const PurchasedBy = ({events}) => {
  // console.log(event);
  // const {} = event;
  // const { user } = useSelector(state => state.user);
  // //use this data for this page
  // const { userGiftItems } = useSelector(state => state.gift);
  // useEffect(() => {
  //   dispatch(GetUserPurchasedGifts(user.id));
  // }, [user]);

  return (
  <Box bg='#F5F5F5'>
    <Box w='100%' mx='auto' pt='5' pb='5'>
        <TableContainer mt='2'>
          <Table variant='simple' size='lg'>
            <Thead bg='#EEEEEE' borderRadius={5} textTransform='capitalize'>
              <Tr borderRadius={5} textTransform='capitalize'>
                <Th>Gift name</Th>
                <Th>Event</Th>
                <Th>Date</Th>
                <Th isNumeric>Qty</Th>
                <Th>Amount paid</Th>
                <Th>Payment type</Th>
              </Tr>
            </Thead>
            <Tbody bg='white'>
              {events.map((event) => {
                return (  
                  <Tr fontSize={14}>
                    <Td>Iphone 14 pro max,</Td>
                    <Td>Wedding of Mr. Adejumo</Td>
                    <Td>June 20 2022, 8:45am</Td>
                    <Td isNumeric>4</Td>
                    <Td>₦ 155,000</Td>
                    <Td>Partial</Td>
                  </Tr>
                )
              })}
                 
            </Tbody>
          </Table>
        </TableContainer>
    </Box>
  </Box>
  )
};

export default PurchasedBy;
