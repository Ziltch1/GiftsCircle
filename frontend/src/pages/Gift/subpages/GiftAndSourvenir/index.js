import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import DisplayTable from './subpages/DisplayTable';

const Index = () => {
  const [gifts, setGifts] = useState([]);
  const [asoebi, setAsoebi] = useState([]);
  const [sourvenir, setSourvenir] = useState([]);
  const { userPurchasedItems } = useSelector(state => state.market);
  const { asoebiItems } = useSelector(state => state.event);
  const { giftItems, sourvernirItems } = useSelector(state => state.gift);

  useEffect(() => {
    if (userPurchasedItems) {
      const sourvenirs = userPurchasedItems.filter(
        x => x.category === 'SOURVENIR'
      );
      setSourvenir(sourvenirs);

      const Gifts = userPurchasedItems.filter(x => x.category === 'GIFT');
      setGifts(Gifts);

      const Asoebis = userPurchasedItems.filter(x => x.category === 'ASOEBI');
      setAsoebi(Asoebis);
    }
  }, [userPurchasedItems]);

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
