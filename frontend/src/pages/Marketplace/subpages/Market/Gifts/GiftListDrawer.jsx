import React, { useState, useEffect } from 'react';
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
import PaymentButton from '../../../../../components/Buttons/PaymentButton';

const GiftListDrawer = ({ setShowDrawer, data, cart, setCart }) => {
  const [newGifts, setNewGifts] = useState([]);

  let giftAmount = 0;

  useEffect(() => {
    const filteredArray = data.filter(obj => cart.includes(obj.id));
    setNewGifts(filteredArray);
  }, [cart]);

  giftAmount = newGifts?.reduce((acc, curr) => acc + curr.amount, 0);

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const btnRef = React.useRef();

  const closeModal = () => {
    setShowDrawer(false);
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
              {newGifts.map(ele => (
                <GiftListItem
                  id={ele.id}
                  item={ele}
                  newGifts={newGifts}
                  setNewGifts={setNewGifts}
                  cart={cart}
                  setCart={setCart}
                />
              ))}
            </Flex>
            <Box mb="5" textAlign="right">
              <Heading fontWeight="medium" fontSize="18px" mb="2">
                Subtotal (₦{giftAmount})
              </Heading>
            </Box>
          </DrawerBody>
          <DrawerFooter borderTop="1px solid lightgray">
            <PaymentButton amount={giftAmount} action={closeModal} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default GiftListDrawer;
