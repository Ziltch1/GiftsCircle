import React, { useEffect } from 'react';
import { Box, Text} from '@chakra-ui/react';
import Search from '../../components/Search/Search';
import Navbar from '../../components/Navbar/Navbar';
import WelcomeModal from '../../components/WelcomeModal/WelcomeModal';
import Tabs from '../../components/Tabs/Tabs';
import { useSelector } from 'react-redux';
import { dispatch } from '../../redux/store';
import { GetUserEvents } from '../../redux/features/events/service';
import EventItem from './components/EventItem';
import { GetGiftItems } from '../../redux/features/gift/service';

const Events = () => {
  const { user } = useSelector(state => state.user);
  const { events } = useSelector(state => state.event);

  useEffect(() => {
    if (user) {
      dispatch(GetUserEvents(user.id));
      dispatch(GetGiftItems());
    }
  }, [user]);

  return (
    <Box bg="#F5F5F5" h="100%" pb="8">
      <WelcomeModal />
      <Box w="90%" mx="auto">
        <Tabs />
        <Search />
        <Box textAlign={'center'} mt="20px">
          <>
            {events.length === 0 ? (
              <Box
                minH={300}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box>
                  <Text fontSize={30} fontWeight="medium" mb="3">
                    Create your first event
                  </Text>
                  <Text fontSize={14} mb="3">
                    Don’t waste time, click the button at right corner to <br />{' '}
                    create your event attatch your gift list
                  </Text>
                </Box>
              </Box>
              ) : (
                <Box>
                  {events.map(event => (
                    <EventItem
                      key={event.id}
                      id={event.id}
                      title={event.title}
                      descSummary={event.summary}
                      date={event.date}
                      image={event?.image}
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
