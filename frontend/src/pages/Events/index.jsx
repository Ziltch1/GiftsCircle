import React, { useEffect, useState, createContext } from 'react';
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


export const SearchContext = React.createContext()

const Index = () => {
  const { user } = useSelector(state => state.user);
  const { events } = useSelector(state => state.event);
  const [filtered, setFiltered] = useState([]);
  const [navPosition, setNavPosition] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterKeyword, setFilterKeyword] = useState('')


  useEffect(() => {
    if (user) {
      dispatch(GetUserEvents(user.id));
      dispatch(GetGiftItems());
    }
  }, [user]);

  useEffect(() => {
    if (events) {
      setLoading(false);
      setFiltered(events)
    }
  }, [events, loading]);


  const updateEvents = (e) => {
    const newData = events.filter((item) => item.title.toLowerCase().startsWith(e.target.value.toLowerCase()));
    const newFilter = events.filter((item) => item.category.toLowerCase().startsWith(filterKeyword.toLowerCase()));
    setFiltered(newData || newFilter);
  };
  
  console.log(filtered, filterKeyword);


  return (
    <Box bg="#F5F5F5" h="100%" pb="8">
      <WelcomeModal />
      <SearchContext.Provider value={[filtered, updateEvents, setFilterKeyword, filterKeyword]}>
      <Box w="90%" mx="auto">
        <Tabs navPosition={navPosition} setNavPosition={setNavPosition} />
        <Search />
        <Box>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              {navPosition === 0 && <Events />}
              {navPosition === 1 && <EventHistory events={events} />}
            </>
          )}
        </Box>
      </Box>
      </SearchContext.Provider>
    </Box>
  );
};

export default Index;
