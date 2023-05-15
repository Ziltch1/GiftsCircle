import { Box, Image, Button, Text, Flex } from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import GiftDetails from '../components/GiftDetails';
import FormFooter from '../../../components/FormFooter';
import { GiftContext } from '..';
import DisplayCard from '../../../../../components/Card';

const GiftCard = ({ step, setStep }) => {
  const { setAddedGiftItems, addedGiftItems, setGiftItems } =
    useContext(GiftContext);
  const [openGiftDetails, setOpenGiftDetails] = useState(false);
  const { giftItems } = useSelector(state => state.gift);
  const { newEvent } = useSelector(state => state.event);
  const [data, setData] = useState([]);
  const [currentGift, setCurrentGift] = useState(null);

  const openDrawer = gift => {
    setCurrentGift(gift);
    setOpenGiftDetails(true);
  };

  const AddGift = id => {
    if (!addedGiftItems.includes(id)) {
      const formBody = {
        eventId: newEvent.id,
        quantity: 1,
        giftItemId: id,
        complimentaryGift: 'none',
        enableContribution: false,
      };
      setGiftItems(prev => [...prev, formBody]);
      setAddedGiftItems(prev => [...prev, id]);
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
              id={item.id}
              data={item}
              action={AddGift}
              text="Add to Cart"
              disabled={addedGiftItems.includes(item.id)}
            />
          );
        })}
      </Flex>
      <FormFooter action={handleSubmit} step={step} />
    </>
  );
};

export default GiftCard;
