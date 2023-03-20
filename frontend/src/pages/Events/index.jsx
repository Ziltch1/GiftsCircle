import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import Search from '../../components/Search/Search';
import Navbar from '../../components/Navbar/Navbar';
import WelcomeModal from '../../components/WelcomeModal/WelcomeModal';
import Tabs from '../../components/Tabs/Tabs';
import { useSelector } from 'react-redux';
import { dispatch } from '../../redux/store';
import { GetUserEvents } from '../../redux/features/events/service';
import EventItem from './components/EventItem';
import { GetGiftItems } from '../../redux/features/gift/service';
import Events from './components/Events'
import EventHistory from './components/EventHistory';

const Index = () => {
  const { user } = useSelector(state => state.user);
  const { events } = useSelector(state => state.event);
  const [navPosition, setNavPosition] = useState(0)

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
        <Tabs navPosition={navPosition} setNavPosition={setNavPosition} />
        <Search />
        <Box>
          {navPosition === 0 && <Events event={events} />}
          {navPosition === 1 && <EventHistory events={events} />}
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
