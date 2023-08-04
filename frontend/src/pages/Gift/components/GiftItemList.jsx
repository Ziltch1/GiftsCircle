import React from 'react';
import {
  Box,
  Heading,
  Text,
  HStack,
  Image,
  Flex,
  Button,
} from '@chakra-ui/react';
import calendarIcon from '../../../components/assets/calendar.svg';
import giftIcon from '../../assets/giftIconSmall.svg';
import { Link } from 'react-router-dom';

const GiftItemList = ({ event }) => {
  const { image, title, id, gift, descSummary, date } = event;
  return (
    <Box mt="8">
      <Box bg="white" mb="5" py="7" px="8" borderRadius={5}>
        <HStack justifyContent={'space-between'} alignItems="center">
          <Box>
            <HStack gap={2.5}>
              <Box>
                <Image src={image} w="120px" h="110px" objectFit='cover' borderRadius={5} />
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
                    dangerouslySetInnerHTML={{
                      __html: descSummary?.substr(0, 100),
                    }}
                  />
                  <Flex fontSize={14} gap={5} color="#717171">
                    <Flex alignItems={'center'} gap={1}>
                      <Image src={calendarIcon} />
                      <Text>{new Date(date).toDateString()}</Text>
                    </Flex>
                    <Flex alignItems={'center'} gap={1}>
                      <Image src={giftIcon} />
                      <Text>{gift?.length} gift items attached.</Text>
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </HStack>
          </Box>

          <Box>
            <Link to={`/dashboard/gift/gift_details/${id}`}>
              <Button
                bg="#00BFB2"
                color="white"
                size="sm"
                fontWeight={'medium'}
                px="20px"
                py="10px"
                borderRadius={5}
                h="35px"
                boxShadow="md"
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

export default GiftItemList;
