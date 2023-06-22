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
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import SkeletonLoader from '../../../../components/Skeleton';

const DonationHistory = () => {
  const { fundRaisingDonors } = useSelector(state => state.event);

  return (
    <Box>
      <Heading mb="4" fontSize={24} fontWeight={500}>
        Donation History
      </Heading>
      <Box>
        {fundRaisingDonors ? (
          fundRaisingDonors.length > 0 ? (
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
          ) : (
            <Box
              h="300px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box textAlign="center">
                <Heading mb="3">Sorry! No Donations yet</Heading>
                <Text>
                  You don't have any donations yet, please check back later
                </Text>
              </Box>
            </Box>
          )
        ) : (
          <SkeletonLoader />
        )}
      </Box>
    </Box>
  );
};

export default DonationHistory;
