import React, { useState, useEffect } from 'react';
import GiftHeader from './subpages/GiftHeader';
import PurchaseHistory from './subpages/PurchaseHistory';
import { Box } from '@chakra-ui/react';
import GiftLists from './subpages/GiftLists';
import { GetCoHostAddedGiftsApi } from '../../../redux/axios/apis/gift';
import { useSelector } from 'react-redux';


const Index = ({ newEvent }) => {
  const [navPosition, setNavPosition] = useState(0);
  const [data, setData] = useState([]);
  const [giftList, setGiftList] = useState([]);
  const { eventGifts } = useSelector(state => state.event);

  // const getAddedGifts = async() => {
  //   try {
  //     const res = await GetCoHostAddedGiftsApi(newEvent?.id, newEvent.userId);
  //     const data = await res.data;
  //     setGiftList(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // useEffect(() => {
  //   getAddedGifts();
  // }, [newEvent]);


  useEffect(() => {
    if (eventGifts) {
      setData(eventGifts);
    }
  }, [eventGifts]);

  // console.log(giftList, data);

  return (
    <Box>
      <GiftHeader
        navPosition={navPosition}
        setNavPosition={setNavPosition}
        event={newEvent}
      />
      {newEvent.published ? (
        <Box>
          {navPosition === 1 && <GiftLists data={data} />}
          {navPosition === 0 && <PurchaseHistory />}
        </Box>
       ) : (
         <GiftLists data={data} /> 
       )} 
    </Box>
  );
};

export default Index;
