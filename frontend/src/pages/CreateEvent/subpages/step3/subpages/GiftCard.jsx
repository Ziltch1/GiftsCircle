import { Box, Image, Button, Text, Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GiftDetails from './GiftDetails';
import FormFooter from '../../FormFooter';

const GiftCard = ({
  setGiftItems,
  step,
  setStep,
  setAddedGiftItems,
  addedGiftItems,
}) => {
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
        {data.map(gift => {
          return (
            <Box
              w="285px"
              minH="250px"
              bg="white"
              p="2.5"
              borderRadius={10}
              boxShadow="sm"
              mb="5"
              cursor="pointer"
              key={gift.id}
            >
              <Image
                src={gift?.image}
                w="279"
                h="142px"
                borderRadius={10}
                alt="gift item image"
                display="block"
                mx="auto"
                mb="2.5"
                onClick={() => openDrawer(gift)}
              />
              <Text fontSize={14} fontWeight={400} mb="2" color="#383838">
                {gift.title}
              </Text>
              <Flex alignItems="center" justifyContent="space-between">
                <Text color="#27272E" fontWeight={600} fontSize={18}>
                  ₦ {gift.amount}
                </Text>
                <Button
                  fontSize={13}
                  fontWeight={500}
                  bg={addedGiftItems.includes(gift.id) ? 'grey' : '#00BFB2'}
                  color="white"
                  w="129px"
                  h="40px"
                  onClick={() => AddGift(gift.id)}
                  id={gift.id}
                >
                  {addedGiftItems.includes(gift.id) ? 'Added' : 'Add to list'}
                </Button>
              </Flex>
            </Box>
          );
        })}
      </Flex>
      <FormFooter action={handleSubmit} step={step} />
    </>
  );
};

export default GiftCard;
