import { Box, Heading, Text, HStack, Image, Flex, Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'
// import calendarIcon from '../../../components/assets/calendar.svg';
// import giftIcon from '../../assets/giftIconSmall.svg';
// import image from '../../assets/sample.svg';
// import GiftDetails from '../GiftDetails';
// import { useSelector } from "react-redux";
// import { GetUserEvents } from "../../../redux/features/events/service";
// import { GetGiftItems } from "../../../redux/features/gift/service";
// import { dispatch } from "../../../redux/store";
import { Link } from 'react-router-dom';
import GiftItemList from './GiftItemList';


const PurchasedFor = ({ events }) => {

    return (
        <Box>
            {events?.length < 1
                    ?
                    <Box textAlign='center' w='100%' h='300px' display='flex' alignItems='center' justifyContent='center'>
                        <Box w='400px'>
                            <Heading fontWeight='semibold' mb='2' fontSize={30}>Gift list is empty</Heading>
                            <Text color='#8C8C8C' fontSize={16}>This is where you will see if any gift has been purchsed for you</Text>
                        </Box>
                    </Box>
                    :
                    <Box w='100%' h='100%'>
                        {events?.map((event) => <GiftItemList key={event.id} event={event} />)}
                    </Box>
            }
        </Box>
    );
};

export default PurchasedFor;
