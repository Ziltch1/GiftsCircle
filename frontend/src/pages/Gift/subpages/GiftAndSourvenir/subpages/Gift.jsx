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


const Gift = ({ newData, sourvenir, gifts }) => {
    const data = [1,2,3,4,5,6,7,8]
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
                        {data?.map((item, index) => {
                            const sourvenirItem = sourvenir?.find(x => x.id === item.sourvenirItemId);
                            return (
                                <>
                                    <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                                        <Td>{index + 1}</Td>
                                        <Td>
                                            {/* {sourvenirItem?.title} */}
                                            Standing fan
                                        </Td>
                                        <Td color="#009F94">
                                            {/* ₦{sourvenirItem?.amount} */}
                                            ₦10000
                                        </Td>
                                        <Td>
                                            {/* {sourvenirItem?.category} */}
                                            Gift
                                        </Td>
                                        <Td>
                                            7
                                            {/* {item.quantity} */}
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