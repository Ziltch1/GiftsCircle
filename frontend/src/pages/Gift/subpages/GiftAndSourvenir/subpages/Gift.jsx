import React, { useState, useEffect } from 'react'

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


const Gift = ({ newGift, gifts }) => {
    
    return (
        <Box my='8'>
            <TableContainer bg="white">
                <Table variant="simple">
                    <Thead bg="#EEEEEE" px="17px" py="40px">
                        <Tr fontSize={14} color="black">
                            <Th>S/N</Th>
                            <Th>Gift name</Th>
                            <Th>Amount</Th>
                            <Th>Category</Th>
                            <Th>Quantity purchased</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {newGift?.map((item, index) => {
                            const giftItem = gifts?.find(x => x.id === item.giftItemId);
                            return (
                                <>
                                    <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                                        <Td>{index + 1}</Td>
                                        <Td>
                                            {giftItem?.title}
                                        </Td>
                                        <Td color="#009F94">
                                            ₦{giftItem?.amount}
                                        </Td>
                                        <Td>
                                            {giftItem?.category}
                                        </Td>
                                        <Td>
                                            {item.quantity}
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

export default Gift