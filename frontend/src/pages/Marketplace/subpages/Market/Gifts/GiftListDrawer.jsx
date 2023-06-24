import React, { useContext } from 'react';
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
  Button,
} from '@chakra-ui/react';
import GiftListItem from './GiftListItem';
import { GiftContext } from '.';
import { dispatch } from '../../../../../redux/store';
import { setCheckoutData } from '../../../../../redux/features/marketplace/marketSlice';

const GiftListDrawer = ({ setShowDrawer, isOpen, setShowCheckout }) => {
  const { GiftItems, amount } = useContext(GiftContext);
  const { onClose } = useDisclosure();
  const btnRef = React.useRef();

  const closeModal = () => {
    setShowDrawer(false);
  };

  const Proceed = () => {
    dispatch(
      setCheckoutData({ type: 'GIFT', data: GiftItems, amount: amount })
    );
    setShowCheckout(true);
  };
  return (
    <>
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
                {GiftItems.map(ele => (
                  <GiftListItem id={ele.ItemId} item={ele} key={ele.ItemId} />
                ))}
              </Flex>
              <Box mb="5" textAlign="right">
                <Heading fontWeight="medium" fontSize="18px" mb="2">
                  Subtotal (₦{amount})
                </Heading>
              </Box>
            </DrawerBody>
            <DrawerFooter borderTop="1px solid lightgray">
              <Button bg="#00BFB2" color="white" onClick={() => Proceed()}>
                Proceed to checkout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default GiftListDrawer;
