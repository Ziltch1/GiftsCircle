import React, { useEffect } from 'react';
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
import GiftHeader from './GiftHeader';
import GiftTabs from '../Gifts/GiftTabs';
import SingleGift from '../Gifts'

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
      <Box>
        <SingleGift />
      </Box>
    </Box>
  );
};

export default Events;
