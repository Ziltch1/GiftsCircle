import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Heading,
  Button,
  Flex,
  HStack,
  Image,
  VStack,
} from '@chakra-ui/react';
import Search from '../../components/Search/Search';
import Navbar from '../../components/Navbar/Navbar';
import WelcomeModal from '../../components/WelcomeModal/WelcomeModal';
import Tabs from '../../components/Tabs/Tabs';
import eventImage from '../../components/assets/event-image.svg';
import calendarIcon from '../../components/assets/calendar.svg';
import lockIcon from '../../components/assets/lock.svg';
import { CheckIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { events } from './data';
import { Link } from 'react-router-dom';

const Events = () => {
  const [isActive, setIsActive] = useState(true);
  const [data, setData] = useState([]);
  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const userId = user.id;
  const api_url = `https://giftcircle-ws.onrender.com/api/event/UserEvents/${userId}`;
  

  const getEvents = async () => {
    axios.get(api_url, {
      headers: {
        'Authorization': `token ${token}`
      }
    }).then((res) => {
        console.log(res.data)
        setData(res.data);
    }).catch((error) => {
        console.error(error)
    })
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Box bg="#F5F5F5" h="100%" pb="8">
      <WelcomeModal />
      <Navbar />
      <Box w="90%" mx="auto">
        <Tabs />
        <Search />
        <Box textAlign={'center'} mt="20px">
          {data.length === 0 ? (
            <Box>
              <Text fontSize={30} fontWeight="medium" mb="3">
                Create your first event
              </Text>
              <Text fontSize={14} mb="3">
                Don’t waste time, click the button at right corner to <br />{' '}
                create your event attatch your gift list
              </Text>
            </Box>
          ) : (
            <Box>
              {data.map(event => {

                const { id, descSummary, title, date, published, image } = event;
                const dateString = date;
                const newDate = new Date(dateString).toDateString();
                const imageUrl = `https://giftcircle-ws.onrender.com/image/${image}`

                return (
                  <Box bg="white" mb="5" py="7" px="8" borderRadius={5} key={id}>
                    <HStack
                      justifyContent={'space-between'}
                      alignItems="center"
                    >
                      <Box>
                        <HStack gap={2.5}>
                          <Box>
                            <Image
                              src={imageUrl}
                              w="109px"
                              h="109px"
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
                              >
                                {descSummary}
                              </Text>
                              <Flex fontSize={14} gap={5} color="#717171">
                                <Flex alignItems={'center'} gap={1}>
                                  <Image src={calendarIcon} />
                                  <Text>{newDate}</Text>
                                </Flex>
                                <Flex alignItems={'center'} gap={1}>
                                  <Image src={lockIcon} />
                                  {id}
                                </Flex>
                                <Flex alignItems={'center'} gap={1}>
                                  <CheckIcon
                                    color={published ? '#00BFB2' : '#717171'}
                                  />{' '}
                                  <Text
                                    color={published ? '#00BFB2' : '#717171'}
                                  >
                                    {published ? 'Active' : 'saved to draft'}
                                  </Text>
                                </Flex>
                              </Flex>
                            </Box>
                          </Box>
                        </HStack>
                      </Box>

                      <Box>
                        <Link to={`/event_details/${id}`}>
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
              })}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Events;
