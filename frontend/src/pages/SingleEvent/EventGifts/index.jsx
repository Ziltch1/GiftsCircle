import React, { useState, useEffect } from 'react';
import GiftHeader from './subpages/GiftHeader';
import PurchaseHistory from './subpages/PurchaseHistory';
import { Box } from '@chakra-ui/react';
import GiftLists from './subpages/GiftLists';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../redux/store';
import { GetEventGifts } from '../../../redux/features/events/service';
import { GetUserPurchasedGiftsApi } from '../../../redux/axios/apis/gift';

const Index = ({ newEvent }) => {
  const eventId = newEvent.id;
  const [navPosition, setNavPosition] = useState(0);
  const [data, setData] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  const { eventGifts } = useSelector(state => state.event);
  const { user } = useSelector(state => state.user);

  const getUserPurchasedGifts = async () => {
    try {
      const res = await GetUserPurchasedGiftsApi(eventId);
      const data = res.data;
      setPurchaseHistory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(GetEventGifts(eventId, user.id));
      getUserPurchasedGifts();
    }
  }, [eventId, user]);

  useEffect(() => {
    if (eventGifts) {
      setData(eventGifts);
    }
  }, [eventGifts]);

  return (
    <Box>
      <GiftHeader
        navPosition={navPosition}
        setNavPosition={setNavPosition}
        event={newEvent}
      />
      {newEvent.published ? (
        <Box>
          {navPosition === 0 && (
            <PurchaseHistory purchaseHistory={purchaseHistory} />
          )}
          {navPosition === 1 && <GiftLists data={data} />}
        </Box>
      ) : (
        <GiftLists data={data} />
      )}
    </Box>
  );
};

export default Index;
