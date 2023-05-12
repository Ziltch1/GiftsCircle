import React, { useEffect, useState } from 'react';
import { Box, Stack, Skeleton } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { dispatch } from '../../redux/store';
import { GetUserEvents } from '../../redux/features/events/service';
import {
  GetGiftItems,
  GetUserPurchasedGifts,
} from '../../redux/features/gift/service';
import GiftHeader from './components/GiftHeader';
import GiftTabs from './components/GiftTabs';
import Search from '../../components/Search/Search';
import SkeletonLoader from '../../components/Skeleton';
import PurchasedFor from './subpages/PurchasedFor/subpages/PurchasedFor';
import PurchasedBy from './subpages/PurchasedBy/subpages/PurchasedBy';
import GiftAndSourvenir from './subpages/GiftAndSourvenir'
import { GetSourvenirApi } from '../../redux/axios/apis/sourvenir';

const Events = () => {
  const { user } = useSelector(state => state.user);
  const [navPosition, setNavPosition] = useState(0);
  const [loading, setLoading] = useState(true);
  const { events } = useSelector(state => state.event);
  const { userPurchasedGiftItems } = useSelector(state => state.gift);
  const [sourvenir, setSourvenir] = useState([]);

  const getSourvenirs = async () => {
    try {
      const res = await GetSourvenirApi();
      const data = await res.data;
      setSourvenir(data);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if (user) {
      dispatch(GetUserEvents(user.id));
      dispatch(GetUserPurchasedGifts(user.id));
      dispatch(GetGiftItems());
      getSourvenirs();
    }
  }, [user]);

  useEffect(() => {
    if (events) {
      setLoading(false);
    }
  }, [events]);

  return (
    <Box bg="#F5F5F5" h="100%" pb="8">
      <Box w="100%" bg="#f5f5f5" h="100%" pb="5">
        <Box w="90%" mx="auto">
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
                    {navPosition === 2 && (
                      <GiftAndSourvenir sourvenir={sourvenir} gifts={userPurchasedGiftItems} />
                    )}
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Events;
