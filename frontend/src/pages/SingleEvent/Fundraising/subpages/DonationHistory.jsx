import {
  Heading,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';

const DonationHistory = () => {
  const { fundRaisingDonors } = useSelector(state => state.event);
  return (
    <Box>
      <Heading mb="4" fontSize={24} fontWeight={500}>
        Donation History
      </Heading>
      <Box>
        <TableContainer bg="white">
          <Table variant="simple">
            <Thead bg="#EEEEEE" fontSize={14}>
              <Tr>
                <Th>S/N</Th>
                <Th>Guest name</Th>
                <Th>Amount paid</Th>
                <Th>Date paid</Th>
              </Tr>
            </Thead>
            <Tbody>
              {fundRaisingDonors?.map((ele, index) => {
                return (
                  <Tr fontSize={14}>
                    <Td>{index + 1}</Td>
                    <Td>
                      {ele.firstName} {ele.lastName}
                    </Td>
                    <Td>{ele.amount}</Td>
                    <Td>
                      {new Date(ele.date).toLocaleDateString() +
                        '  ' +
                        new Date(ele.date).toLocaleTimeString()}{' '}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default DonationHistory;
