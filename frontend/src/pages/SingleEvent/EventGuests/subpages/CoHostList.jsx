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
    Flex, Heading
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import SkeletonLoader from '../../../../components/Skeleton';
import { GetEventCohostsApi } from '../../../../redux/axios/apis/events';

const CoHostList = ({data}) => {
    const { eventGuests, newEvent } = useSelector(state => state.event);
    const [loading, setLoading] = useState(true);

   useEffect(() => {
       if (data) {
        setLoading(false);
       }else{
        setLoading(false);
       }
   }, [data])

    return (
        <Box minH='500px'>
            {!data.lenth < 1 ? 
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
            : <Box minH='300px' display='flex' alignItems='center' justifyContent='center'><Heading fontSize={30}>No co-hosts yet</Heading></Box>}
        </Box>
    );
};

export default CoHostList;
