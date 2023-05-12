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


const Sourvenir = ({ newData, sourvenir }) => {

    return (
        <Box my='8'>
            <TableContainer bg="white">
                <Table variant="simple">
                    <Thead bg="#EEEEEE" px="17px" py="40px">
                        <Tr fontSize={14} color="black">
                            <Th>S/N</Th>
                            <Th>Sourvenir name</Th>
                            <Th>Amount</Th>
                            <Th>Category</Th>
                            <Th>Quantity purchased</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {newData?.map((item, index) => {
                            const sourvenirItem = sourvenir?.find(x => x.id === item.sourvenirItemId);
                            return (
                                <>
                                    <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                                        <Td>{index + 1}</Td>
                                        <Td>{sourvenirItem?.title}</Td>
                                        <Td color="#009F94">
                                            ₦{sourvenirItem?.amount}
                                        </Td>
                                        <Td>{sourvenirItem?.category}</Td>
                                        <Td>{item.quantity}</Td>
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

export default Sourvenir