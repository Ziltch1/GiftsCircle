import { Box, Heading, Text, HStack, Image, Flex, Button } from '@chakra-ui/react'
import React, {useEffect} from 'react'
import calendarIcon from '../../../components/assets/calendar.svg';
import giftIcon from '../../assets/giftIconSmall.svg';
import image from '../../assets/sample.svg';
import GiftDetails from './GiftDetails';
import { useSelector } from "react-redux";
import { GetUserEvents } from "../../../redux/features/events/service";
import { GetGiftItems } from "../../../redux/features/gift/service";
import { dispatch } from "../../../redux/store";
import { Link } from 'react-router-dom';


const PurchasedFor = ({events}) => {

  return (
    <Box>
        {
        events.length < 1 
            ? 
              <Box textAlign='center' w='100%' h='300px' display='flex' alignItems='center' justifyContent='center'>
                  <Box w='400px'>
                      <Heading fontWeight='semibold' mb='2' fontSize={30}>Gift list is empty</Heading>
                      <Text color='#8C8C8C' fontSize={16}>This is where you will see if any gift has been purchsed for you</Text>
                  </Box>
              </Box>
            :
            <Box w='100%' h='100%'>
                {events.map((event) => <GiftItem key={event.id} event={event} />)}
            </Box>
        }
    </Box>
  );
};

export default PurchasedFor;


export const GiftItem = ({event}) => {
    const {title, date, descSummary,gifts, image, id} = event;
    return (
        <Box mt='8'>
            <Box bg="white" mb="5" py="7" px="8" borderRadius={5}>
                <HStack justifyContent={'space-between'} alignItems="center">
                    <Box>
                        <HStack gap={2.5}>
                            <Box>
                                <Image
                                    src={image}
                                    w="120px"
                                    h="110px"
                                    borderRadius={5}
                                />
                            </Box>
                            <Box>
                                <Box textAlign={'left'}>
                                    <Heading
                                        fontWeight={'medium'}
                                        fontSize="18px"
                                        lineHeight={'26px'}
                                        mb="2"
                                    >
                                        {title}
                                    </Heading>
                                    <Text
                                        fontSize={14}
                                        textAlign="left"
                                        fontWeight={400}
                                        mb="2"
                                        dangerouslySetInnerHTML={{ __html: descSummary?.substr(0,100) }}
                                    />
                                    <Flex fontSize={14} gap={5} color="#717171">
                                        <Flex alignItems={'center'} gap={1}>
                                            <Image src={calendarIcon} />
                                            <Text>{new Date(date).toDateString()}</Text>
                                        </Flex>
                                        <Flex alignItems={'center'} gap={1}>
                                            <Image src={giftIcon} />
                                            <Text>{gifts.length} gift items attached</Text>
                                        </Flex>
                                    </Flex>
                                </Box>
                            </Box>
                        </HStack>
                    </Box>

                    <Box>
                        <Link to={`/dashboard/gift_details/${id}`}>
                            <Button
                                bg="#00BFB2"
                                color="white"
                                size="sm"
                                fontWeight={'medium'}
                                px="20px"
                                py="10px"
                                borderRadius={5}
                                h="35px"
                                boxShadow='md'
                            >
                                View gifts
                            </Button>
                        </Link>
                    </Box>
                </HStack>
            </Box>
        </Box>
    )
}
