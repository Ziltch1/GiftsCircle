import React from 'react';
import {
  Box,
  Text,
  Heading,
  Button,
  Flex,
  HStack,
  Image,
} from '@chakra-ui/react';
import calendarIcon from '../../../components/assets/calendar.svg';
import lockIcon from '../../../components/assets/lock.svg';
import { CheckIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import giftIcon from '../../assets/giftIconSmall.svg';

const EventItem = ({ title, date, descSummary, gifts, image, id, event }) => {
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
                    dangerouslySetInnerHTML={{ __html: descSummary?.substr(0, 100) }}
                  />
                  <Flex fontSize={14} gap={5} color="#717171">
                    <Flex alignItems={'center'} gap={1}>
                      <Image src={calendarIcon} />
                      <Text>{new Date(date).toDateString()}</Text>
                    </Flex>
                    <Flex alignItems={'center'} gap={1}>
                      <Image src={giftIcon} />
                      <Text>{event.gifts.length} gift items attached</Text>
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
  );
};

export default EventItem;
