import { Box, Stack, Skeleton } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Search from '../../components/Search/Search';
import GiftHeader from '../Gift/GiftHeader';
import PurchasedBy from './PurchasedBy';
// import PurchasedFor from './PurchasedFor/PurchasedFor'
import PurchasedFor from './PurchasedFor';
import { useSelector } from 'react-redux';
import { GetUserEvents } from '../../redux/features/events/service';
import { dispatch } from '../../redux/store';
import {
  GetGiftItems,
  GetUserPurchasedGifts,
} from '../../redux/features/gift/service';
import GiftTabs from './GiftTabs';
import SkeletonLoader from '../../components/Skeleton';
import Navbar from '../../components/Navbar/Navbar';


const Index = () => {
  const [navPosition, setNavPosition] = useState(0);
  const [loading, setLoading] = useState(true);
  const { events } = useSelector(state => state.event);
  const { userPurchasedGiftItems } = useSelector(state => state.gift);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (user) {
      dispatch(GetUserEvents(user.id));
      dispatch(GetUserPurchasedGifts(user.id));
      dispatch(GetGiftItems());
    }
  }, [user]);

  
  useEffect(() => {
    if (events) {
      setLoading(false);
    }
  }, [events]);

  return (
    <Box w="100%" bg="#f5f5f5" h="100%" pb="5">
      {/* <Navbar /> */}
      <Box w='90%' mx='auto'>
      <GiftHeader />
      <GiftTabs navPosition={navPosition} setNavPosition={setNavPosition} />
      <Search />
      {loading ? (
        <Stack spacing="20px">
          <Skeleton height="50px" width="100%" />
          <Skeleton height="50px" width="75%" />
          <Skeleton height="50px" width="50%" />
        </Stack>
      ) : (
        <>
          <Box w="100%" mx="auto">
            {loading ? (
              <SkeletonLoader />
            ) : (
              <>
                {navPosition === 0 && <PurchasedFor events={events} />}
                {navPosition === 1 && (
                  <PurchasedBy items={userPurchasedGiftItems} />
                )}
              </>
            )}
          </Box>
        </>
      )}
      </Box>
    </Box>
  );
};

export default Index;
