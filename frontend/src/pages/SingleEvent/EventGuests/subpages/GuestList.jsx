import React, { useEffect, useState } from 'react';
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
  Flex,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import SkeletonLoader from '../../../../components/Skeleton';

const GuestList = () => {
  const { eventGuests } = useSelector(state => state.event);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (eventGuests) {
      setLoading(false);
      setData(eventGuests);
    }
  }, [eventGuests]);
  return (
    <Box minH='500px'>
      <TableContainer bg="white">
        <Table variant="simple">
          <Thead bg="#EEEEEE" px="17px" py="40px">
            <Tr fontSize={14} color="black">
              <Flex justifyContent="space-between">
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
            <>
              {loading ? (
                <SkeletonLoader />
              ) : (
                <>
                  {data.map((ele, index) => {
                    return (
                      <>
                        <Tr fontSize={14} _hover={{ bg: '#EBFAF9' }}>
                          <Flex justifyContent="space-between">
                            <Box>
                              <Td>{index + 1}</Td>
                              <Td>
                                <Image src="" />
                                {ele.user.firstname} {ele.user.lastname}
                              </Td>
                            </Box>
                            <Box>
                              <Td>
                                {new Date(ele.created_at).toDateString()}
                              </Td>
                            </Box>
                          </Flex>
                        </Tr>
                      </>
                    );
                  })}{' '}
                </>
              )}
            </>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GuestList;
