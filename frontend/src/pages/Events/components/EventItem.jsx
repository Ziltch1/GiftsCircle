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

const EventItem = ({ id, image, title, descSummary, published, date }) => {
  console.log(image)
  return (
    <Box bg="white" mb="5" py="7" px="8" borderRadius={5} key={id}>
      <HStack justifyContent={'space-between'} alignItems="center">
        <Box>
          <HStack gap={2.5}>
            <Box>
              <Image
                src={`https://giftcircle-ws.onrender.com/images/Events/${image}`}
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
                <Text fontSize={14} textAlign="left" fontWeight={400} mb="2">
                  {descSummary}
                </Text>
                <Flex fontSize={14} gap={5} color="#717171">
                  <Flex alignItems={'center'} gap={1}>
                    <Image src={calendarIcon} />
                    <Text>{new Date(date).toDateString()}</Text>
                  </Flex>
                  <Flex alignItems={'center'} gap={1}>
                    <Image src={lockIcon} />
                    {id}
                  </Flex>
                  <Flex alignItems={'center'} gap={1}>
                    <CheckIcon color={published ? '#00BFB2' : '#717171'} />{' '}
                    <Text color={published ? '#00BFB2' : '#717171'}>
                      {published ? 'Active' : 'saved to draft'}
                    </Text>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          </HStack>
        </Box>

        <Box>
          <Link to={`/dashboard/event_details/${id}`}>
            <Button
              bg="#00BFB2"
              color="white"
              size="sm"
              fontWeight={'medium'}
              px="20px"
              py="10px"
              borderRadius={5}
              h="35px"
            >
              View event
            </Button>
          </Link>
        </Box>
      </HStack>
    </Box>
  );
};

export default EventItem;
