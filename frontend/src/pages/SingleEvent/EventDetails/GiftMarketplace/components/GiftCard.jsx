import { Flex, useToast } from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import GiftDetails from './GiftDetails';
import { GiftContext } from '..';
import DisplayCard from '../../../../../components/Card';

const GiftCard = ({ step, setStep }) => {
  const {
    setAddedGiftItems,
    addedGiftItems,
    setGiftItems,
    quantity,
    GiftItems,
    setQuantity,
  } = useContext(GiftContext);
  const [openGiftDetails, setOpenGiftDetails] = useState(false);
  const { giftItems } = useSelector(state => state.gift);
  const { newEvent } = useSelector(state => state.event);
  const [data, setData] = useState([]);
  const [currentGift, setCurrentGift] = useState(null);
  const toast = useToast();

  const AddGift = id => {
    if (!addedGiftItems.includes(id)) {
      if (GiftItems.length > 0) {
        const newGiftItem = GiftItems?.find(x => x?.ItemId === id);
        setQuantity(newGiftItem?.quantity);
      }
      const formBody = {
        eventId: newEvent.id,
        quantity: quantity ? quantity : 1,
        giftItemId: id,
        complimentaryGift: 'none',
        enableContribution: false,
      };
      setGiftItems(prev => [...prev, formBody]);
      setAddedGiftItems(prev => [...prev, id]);
      toast({
        description: 'Gift has been added to cart successfully',
        status: 'success',
        duration: 1000,
        position: 'top-right',
        isClosable: true,
      });
    }
  };

  const handleSubmit = () => {
    setStep(step + 1);
  };

  useEffect(() => {
    if (giftItems.length > 0) {
      setData([...giftItems]);
    }
  }, [giftItems]);

  return (
    <>
      <Flex alignItems="center" gap="24px" flexWrap="wrap">
        {openGiftDetails && (
          <GiftDetails
            setOpenGiftDetails={setOpenGiftDetails}
            gift={currentGift}
            added={addedGiftItems.includes(currentGift.id)}
            setAddedGiftItems={setAddedGiftItems}
            setGiftItems={setGiftItems}
          />
        )}
        {data.map(item => {
          return (
            <DisplayCard
              key={item.id}
              id={item.id}
              data={item}
              action={AddGift}
              text="Add to List"
              disabled={addedGiftItems.includes(item.id)}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default GiftCard;
