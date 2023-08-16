import React, { useState, useEffect } from 'react';
import GiftHeader from './subpages/GiftHeader';
import PurchaseHistory from './subpages/PurchaseHistory';
import { Box } from '@chakra-ui/react';
import GiftLists from './subpages/GiftLists';
import { GetCoHostAddedGiftsApi } from '../../../redux/axios/apis/gift';
import { useSelector } from 'react-redux';
import SkeletonLoader from '../../../components/Skeleton';

const Index = ({ newEvent }) => {
  const [navPosition, setNavPosition] = useState(0);
  const [data, setData] = useState([]);
  const { user } = useSelector(state => state.user);
  const [loading, setLoading] = useState(true);

  const getAddedGifts = async () => {
    try {
      const res = await GetCoHostAddedGiftsApi(newEvent?.id, user.id);
      if (res.data) {
        setData(res.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAddedGifts();
  }, []);

  return (
    <Box>
      <GiftHeader
        navPosition={navPosition}
        setNavPosition={setNavPosition}
        event={newEvent}
      />
      {newEvent.published ? (
        <Box>
          {navPosition === 1 && (
            <>{loading ? <SkeletonLoader /> : <GiftLists data={data} />}</>
          )}
          {navPosition === 0 && <PurchaseHistory />}
        </Box>
      ) : (
        <GiftLists data={data} />
      )}
    </Box>
  );
};

export default Index;
