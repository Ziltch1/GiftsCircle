import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import DisplayTable from './subpages/DisplayTable';
import { GetUserSourvenirApi } from '../../../../redux/axios/apis/sourvenir';
import { GetUserGiftApi, GetUserPurchasedGiftsApi } from '../../../../redux/axios/apis/gift';
import { GetUserPurchasedAsoebiApi } from '../../../../redux/axios/apis/asoebi';

const Index = () => {
  const [gifts, setGifts] = useState([]);
  const [asoebi, setAsoebi] = useState([]);
  const [sourvenir, setSourvenir] = useState([]);
  const { userPurchasedItems } = useSelector(state => state.market);
  const { asoebiItems } = useSelector(state => state.event);
  const { giftItems, sourvernirItems } = useSelector(state => state.gift);
  const { user } = useSelector(state => state.user);

   const getUserPurchasedGifts = async () => {
     try {
       const res = await GetUserPurchasedGiftsApi(user.id);
       const data = await res.data;
       setGifts(data);
       console.log(data);
     } catch (error) {
       console.log(error);
     }
   };

  const getUserPurchasedSourvenirs = async () => {
    try {
      const res = await GetUserSourvenirApi(user.id);
      const data = await res.data;
      setSourvenir(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPurchasedAsoebis = async () => {
    try {
      const res = await GetUserPurchasedAsoebiApi(user.id);
      const data = await res.data;
      setAsoebi(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getUserPurchasedSourvenirs();
    getUserPurchasedGifts();
    getUserPurchasedAsoebis();
    // if (userPurchasedItems) {
    //   const sourvenirs = userPurchasedItems.filter(
    //     x => x.category === 'SOURVENIR'
    //   );
    //   setSourvenir(sourvenirs);

    //   const Gifts = userPurchasedItems.filter(x => x.category === 'GIFT');
    //   setGifts(Gifts);

    //   const Asoebis = userPurchasedItems.filter(x => x.category === 'ASOEBI');
    //   setAsoebi(Asoebis);
    // }
  }, []);

  return (
    <Box>
      <DisplayTable data={gifts} auxData={giftItems} category="Gift" />
      <DisplayTable data={asoebi} auxData={asoebiItems} category="Asoebi" />
      <DisplayTable
        data={sourvenir}
        auxData={sourvernirItems}
        category="Sourvenir"
      />
    </Box>
  );
};

export default Index;
