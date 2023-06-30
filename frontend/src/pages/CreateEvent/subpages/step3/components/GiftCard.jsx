
import { Flex } from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import GiftDetails from '../components/GiftDetails';
import FormFooter from '../../../components/FormFooter';
import { GiftContext } from '..';
import DisplayCard from '../../../../../components/Card';

const GiftCard = ({ step, setStep }) => {
  const { setAddedGiftItems, addedGiftItems, setGiftItems, quantity, GiftItems, setQuantity } =
    useContext(GiftContext);
  const [openGiftDetails, setOpenGiftDetails] = useState(false);
  const { giftItems } = useSelector(state => state.gift);
  const { newEvent } = useSelector(state => state.event);
  const [data, setData] = useState([]);
  const [currentGift, setCurrentGift] = useState(null);

  const AddGift = id => {
    if (!addedGiftItems.includes(id)) {
      if (GiftItems.length > 0) {
        const newGiftItem = GiftItems?.find(x => x?.ItemId === id);
        setQuantity(newGiftItem?.quantity)
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
              text="Add to List"
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
