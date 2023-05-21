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

const GiftListDrawer = ({ setShowListDrawer }) => {
  const [newGifts, setNewGifts] = useState([]);
  const { giftItems } = useSelector(state => state.gift);

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

  const closeModal = () => {
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
          <DrawerCloseButton onClick={closeModal} />

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
            <PaymentButton amount={amount} action={closeModal} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default GiftListDrawer;
