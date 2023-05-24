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
} from '@chakra-ui/react';
import GiftListItem from './GiftListItem';
import PaymentButton from '../../../../../components/Buttons/PaymentButton';
import { GiftContext } from '.';
import { dispatch } from '../../../../../redux/store';
import { BuyItems } from '../../../../../redux/features/marketplace/service';

const GiftListDrawer = ({ setShowDrawer, isOpen }) => {
  const { GiftItems, setGiftItems, amount, setAddedGiftItems } =
    useContext(GiftContext);
  const { onClose } = useDisclosure();
  const btnRef = React.useRef();

  const closeModal = () => {
    setShowDrawer(false);
  };

  const HandleSubmit = () => {
    if (GiftItems.length > 0) {
      dispatch(BuyItems(GiftItems));
      setGiftItems([]);
      setAddedGiftItems([]);
      closeModal();
    } else {
      setShowDrawer();
    }
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
              {GiftItems.map(ele => (
                <GiftListItem id={ele.ItemId} item={ele} />
              ))}
            </Flex>
            <Box mb="5" textAlign="right">
              <Heading fontWeight="medium" fontSize="18px" mb="2">
                Subtotal (₦{amount})
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
