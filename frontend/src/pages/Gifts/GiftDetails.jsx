import React, { useEffect, useState } from "react";
import {
    Box, Text, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, Skeleton, Heading, Stack } from "@chakra-ui/react";
import Search from "../../components/Search/Search";
import BackButton from "../CreateEvent/subpages/BackButton";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { dispatch } from "../../redux/store";
import { GetUserEvents } from "../../redux/features/events/service";


export default function GiftDetails() {
    
    const navigate = useNavigate();
    const [newEvent, setNewEvent] = useState()
    const { id } = useParams();
    const {events} = useSelector(state => state.event);
    useEffect(() => {
        if (events.length > 0) {
            const specificEvent = events.filter(event => event.id === id)[0];
            setNewEvent(specificEvent);
        } else {
            console.log('something went wrong');
            // dispatch(GetUserEvents(userId));
        }
    }, [events,id]);

    console.log(newEvent);

    return (
        <Box bg='#F5F5F5'>           
            <Box w='85%' mx='auto' pt='10' pb='5'>
                <BackButton action={() => navigate(-1)} />
                <Heading mb='7' mt='5' fontWeight='bold' fontSize={25}>{newEvent?.title}</Heading>
                <Search />

                {newEvent?.gifts.length === 0 ? 
                <Box h='100vh'>
                        <Heading textAlign='center' mt='10' fontWeight={600} fontSize={30}>Sorry! you don't have any gifts yet</Heading>
                </Box>
                :
                <TableContainer mt='8'>
                    <Table variant='simple' size='lg'>
                        <Thead bg='#EEEEEE' borderRadius={5} textTransform='capitalize'>
                            <Tr borderRadius={5} textTransform='capitalize'>
                                <Th>Gift name</Th>
                                <Th>Purchased by</Th>
                                <Th>Date</Th>
                                <Th isNumeric>Qty</Th>
                                <Th>Payment status</Th>
                                <Th>Amount left</Th>
                                <Th>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody bg='white'>
                            
                                    {newEvent?.gifts.map((event) => {
                                        return (
                                            
                                                <Tr>
                                                    <Td>inches</Td>
                                                    <Td>millimetres (mm)</Td>
                                                    <Td isNumeric>25.4</Td>
                                                    <Td>inches</Td>
                                                    <Td>millimetres (mm)</Td>
                                                    <Td isNumeric>25.4</Td>
                                                    <Td>inches</Td>
                                                </Tr>
                                            
                                        )
                                    })}
                            
                        </Tbody>
                    </Table>
                </TableContainer>
                }
            </Box>        
        </Box>
    )
}