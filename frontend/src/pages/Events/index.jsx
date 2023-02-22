import React, { useState, useEffect } from 'react';
import { Box, Text, Stack, Skeleton } from '@chakra-ui/react';
import Search from '../../components/Search/Search';
import Navbar from '../../components/Navbar/Navbar';
import WelcomeModal from '../../components/WelcomeModal/WelcomeModal';
import Tabs from '../../components/Tabs/Tabs';
import { useSelector } from 'react-redux';
import { dispatch } from '../../redux/store';
import { GetUserEvents } from '../../redux/features/user/service';
import EventItem from './components/EventItem';

const Events = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.auth.user);
  const { events } = useSelector(state => state.user);

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
          {loading ? (
            <Stack spacing="20px">
              <Skeleton height="50px" width="100%" />
              <Skeleton height="50px" width="75%" />
              <Skeleton height="50px" width="50%" />
            </Stack>
          ) : (
            <>
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
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Events;
