import React from 'react';

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

const DisplayTable = ({ data, auxData, category }) => {
  return (
    <Box my="8">
      <TableContainer bg="white">
        <Table variant="simple">
          <Thead bg="#EEEEEE" px="17px" py="40px">
            <Tr fontSize={14} color="black">
              <Th>S/N</Th>
              <Th>{category} name</Th>
              <Th>Amount</Th>
              <Th>Category</Th>
              <Th>Quantity purchased</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item, index) => {
              const subItem = auxData?.find(x => x.id === item.ItemId);
              return (
                <>
                  <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                    <Td>{index + 1}</Td>
                    <Td>{subItem?.title}</Td>
                    <Td color="#009F94">₦{subItem?.amount}</Td>
                    <Td>{subItem?.category}</Td>
                    <Td>{item.quantity}</Td>
                  </Tr>
                </>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DisplayTable;
