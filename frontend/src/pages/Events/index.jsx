import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import Search from '../../components/Search/Search';
import WelcomeModal from '../../components/WelcomeModal/WelcomeModal';
import Tabs from '../../components/Tabs/Tabs';
import { useSelector } from 'react-redux';
import { dispatch } from '../../redux/store';
import { GetUserEvents } from '../../redux/features/events/service';
import { GetGiftItems } from '../../redux/features/gift/service';
import Events from './components/Events';
import EventHistory from './components/EventHistory';
import SkeletonLoader from '../../components/Skeleton';

const Index = () => {
  const { user } = useSelector(state => state.user);
  const { events } = useSelector(state => state.event);
  const [filter, setFilter] = useState('');
  const [navPosition, setNavPosition] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    if (user) {
      dispatch(GetUserEvents(user.id));
      dispatch(GetGiftItems());
    }
  }, [user]);

  useEffect(() => {
    if (events) {
      setLoading(false);
      setData(events);
    }
  }, [events, loading]);

  useEffect(() => {
    if (events) {
      if (filter === '' && searchQuery === '') {
        setData(events);
      } else {
        const newData = events.filter(
          item =>
            (filter === '' ? false : item.category === filter) ||
            (searchQuery === ''
              ? false
              : item.title.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setData(newData);
      }
    }
  }, [searchQuery, events, filter]);
  return (
    <Box bg="#F5F5F5" h="100%" pb="8">
      <WelcomeModal />
      <Box w="90%" mx="auto">
        <Tabs navPosition={navPosition} setNavPosition={setNavPosition} />
        <Search
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          filter={filter}
          setFilter={setFilter}
        />
        <Box>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              {navPosition === 0 && <Events events={data} />}
              {navPosition === 1 && <EventHistory events={data} />}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
