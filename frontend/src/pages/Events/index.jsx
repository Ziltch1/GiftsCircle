import React, { useState, useEffect } from 'react';
import { Box, Text, Stack, Skeleton } from '@chakra-ui/react';
import Search from '../../components/Search/Search';
import Navbar from '../../components/Navbar/Navbar';
import WelcomeModal from '../../components/WelcomeModal/WelcomeModal';
import Tabs from '../../components/Tabs/Tabs';
import { useSelector } from 'react-redux';
import { dispatch } from '../../redux/store';
import { GetUserEvents } from '../../redux/features/events/service';
import EventItem from './components/EventItem';

const Events = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.auth.user);
  const { events } = useSelector(state => state.event);

  useEffect(() => {
    if (user) {
      dispatch(GetUserEvents(user.id));
    }
  }, [user]);

  useEffect(() => {
    if (events) {
      if (events.length > 0) {
        setData(events);
      }
    }
  }, [events]);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  return (
    <Box bg="#F5F5F5" h="100%" pb="8">
      <WelcomeModal />
      <Navbar />
      <Box w="90%" mx="auto">
        <Tabs />
        <Search />
        <Box textAlign={'center'} mt="20px">
            <>
              {data.length === 0 ? (
                <Box minH='300px' display='flex' alignItems='center' justifyContent='center'>
                  <Box>
                    <Text fontSize={30} fontWeight="medium" mb="3">
                      Create your first event
                    </Text>
                    <Text fontSize={14} mb="3">
                      Don’t waste time, click the button at right corner to <br />{' '}
                      create your event and attatch your gift list
                    </Text>
                  </Box>
                </Box>
              ) : (
                <Box>
                  {data.map(event => (
                    <EventItem
                      key={event.id}
                      id={event.id}
                      title={event.title}
                      descSummary={event.descSummary}
                      date={event.date}
                      image={event.image}
                      published={event.published}
                    />
                  ))}
                </Box>
              )}
            </>
          
        </Box>
      </Box>
    </Box>
  );
};

export default Events;
