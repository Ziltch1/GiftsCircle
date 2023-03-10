import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetUserPurchasedGifts } from '../../../redux/features/gift/service';
import { dispatch } from '../../../redux/store';

const PurchasedBy = () => {
  const { user } = useSelector(state => state.user);
  //use this data for this page
  const { userGiftItems } = useSelector(state => state.gift);
  useEffect(() => {
    dispatch(GetUserPurchasedGifts(user.id));
  }, [user]);

  return <div>PurchasedBy</div>;
};

export default PurchasedBy;
