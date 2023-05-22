import React, { useState, useEffect, useContext } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  useDisclosure,
  Box,
  Heading,
  Flex,
} from '@chakra-ui/react';
import GiftListItem from './GiftListItem';
import { useSelector } from 'react-redux';
import PaymentButton from '../../../../../components/Buttons/PaymentButton';
import { CartContext } from '..';
import ComplimentaryListItem from './ComplimentaryListItem';
import { dispatch } from '../../../../../redux/store';
import { BuyGifts } from '../../../../../redux/features/gift/service';

const GiftListDrawer = ({ setShowListDrawer }) => {
  const { giftItems } = useSelector(state => state.gift);
  const { user } = useSelector(state => state.user);

  const {
    complimentaryGifts,
    setAmount,
    ComplimentaryItems,
    complimentaryGiftAmount,
    giftAmount,
    GiftItems,
    amount,
    setGiftAmount,
    setComplimentaryGiftAmount,
  } = useContext(CartContext);

  useEffect(() => {
    let complimentaryAmount = 0;
    let giftAmount = 0;
    ComplimentaryItems.forEach(ele => {
      const newData = complimentaryGifts?.find(x => x.id === ele?.id);
      complimentaryAmount = complimentaryAmount + newData.amount;
    });
    setComplimentaryGiftAmount(complimentaryAmount);

    GiftItems.forEach(ele => {
      const newData = giftItems?.find(x => x.id === ele?.giftItemId);
      giftAmount = giftAmount + newData.amount;
    });
    setGiftAmount(giftAmount);

    setAmount(complimentaryAmount + giftAmount);
  }, [
    ComplimentaryItems,
    setAmount,
    setComplimentaryGiftAmount,
    setGiftAmount,
    GiftItems,
  ]);

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const btnRef = React.useRef();

  const HandleSubmit = () => {
    const formBody = [];
    GiftItems.forEach(item => {
      const newData = giftItems?.find(x => x.id === item?.giftItemId);
      const formData = {
        status: 'COMPLETED',
        giftId: item.id,
        userId: user.id,
        eventId: item.eventId,
        complimentaryGift:
          ComplimentaryItems.length > 0 ? ComplimentaryItems[0].id : '',
        amount: newData.amount,
      };
      formBody.push(formData);
    });
    dispatch(BuyGifts(formBody));
    console.log(formBody);

    setShowListDrawer(false);
  };

  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={() => setShowListDrawer(false)} />

          <DrawerHeader>
            <Heading fontWeight="medium" fontSize="25px" mb="2">
              Summary of Purchase
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            <Flex justifyContent="space-between" flexWrap="wrap" mb="5">
              {GiftItems.map(ele => {
                const newData = giftItems?.find(x => x.id === ele?.giftItemId);
                return <GiftListItem id={ele.id} item={newData} />;
              })}
            </Flex>
            <Box mb="5" textAlign="right">
              <Heading fontWeight="medium" fontSize="18px" mb="2">
                Subtotal (₦{giftAmount})
              </Heading>
            </Box>

            <Heading fontWeight="medium" fontSize="23px" mb="5">
              Complimentary Gift(s)
            </Heading>

            <Flex justifyContent="space-between" flexWrap="wrap">
              {ComplimentaryItems.map(ele => (
                <ComplimentaryListItem id={ele.id} item={ele} />
              ))}
            </Flex>

            <Box mb="5" textAlign="right">
              <Heading fontWeight="medium" fontSize="18px" mb="2">
                Subtotal (₦{complimentaryGiftAmount})
              </Heading>
            </Box>
          </DrawerBody>
          <DrawerFooter borderTop="1px solid lightgray">
            <PaymentButton amount={amount} action={HandleSubmit} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default GiftListDrawer;
