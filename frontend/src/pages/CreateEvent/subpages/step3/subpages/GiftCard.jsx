import { Box, Image, Button, Text, Flex } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import GiftDetails from './GiftDetails';
import axios from 'axios'
import { AddGiftApi } from '../../../../../redux/axios/apis/events';
import { dispatch } from '../../../../../redux/store';
import { setNewEvent } from '../../../../../redux/features/events/eventSlice';
import FormFooter from '../../FormFooter';
import { createResponse } from '../../../../../redux/utils/UtilSlice';
import ErrorHandler from '../../../../../redux/axios/Utils/ErrorHandler';

const GiftCard = ({ openGiftDetails, setOpenGiftDetails, step, setStep }) => {
  const { giftItems } = useSelector(state => state.gift);
  const { user } = useSelector(state => state.user);
  const { newEvent } = useSelector(state => state.event);

  const openDrawer = () => {
    setOpenGiftDetails(true);
  };

  const addGift = async (e) => {
    const itemId = e.target.id;
    const formBody = {
      eventId: newEvent.id,
      userId: user.id,
      quantity: 1,
      giftItemId: itemId,
      complimentaryGift: 'none',
    };

    try {
      const res = await AddGiftApi(formBody);
      localStorage.setItem('newEvent', JSON.stringify(res.data));
      dispatch(setNewEvent(res.data));
    } catch (error) {
      dispatch(createResponse(ErrorHandler(error)));
    }

  }

  const handleSubmit = () => {
    setStep(step + 1);
  }

  return (
    <>
    <Flex alignItems="center" justifyContent="space-between" flexWrap="wrap">
      {openGiftDetails && (
        <GiftDetails setOpenGiftDetails={setOpenGiftDetails} />
      )}
      {giftItems.map(gift => {
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
              src={`https://giftcircle-ws.onrender.com/images/giftItems/${gift.image}`}
              w="279"
              h="142px"
              borderRadius={10}
              alt="gift item image"
              display="block"
              mx="auto"
              mb="2.5"
              onClick={openDrawer}
            />
            <Text fontSize={14} fontWeight={400} mb="2" color="#383838">
              {gift.details}
            </Text>
            <Flex alignItems="center" justifyContent="space-between">
              <Text color="#27272E" fontWeight={600} fontSize={18}>
                ₦ {gift.amount}
              </Text>
              <Button
                fontSize={13}
                fontWeight={500}
                bg="#00BFB2"
                color="white"
                w="129px"
                h="40px"
                onClick={addGift}
                id={gift.id}
              >
                Add to list
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
