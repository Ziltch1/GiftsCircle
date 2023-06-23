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
  Button
} from '@chakra-ui/react';
import GiftListItem from './GiftListItem';
import PaymentButton from '../../../../../components/Buttons/PaymentButton';
import { SourvenirContext } from '.';
import { dispatch } from '../../../../../redux/store';
import { BuyItems } from '../../../../../redux/features/marketplace/service';
import { setCheckoutData } from '../../../../../redux/features/marketplace/marketSlice';

const GiftListDrawer = ({ setShowDrawer, isOpen, setShowCheckout }) => {
  const {
    SourvenirItems,
    setSourvernirItems,
    amount,
    setAddedSourvernirItems,
  } = useContext(SourvenirContext);
  const { onClose } = useDisclosure();
  const btnRef = React.useRef();

  const closeModal = () => {
    setShowDrawer(false);
  };

  // const HandleSubmit = () => {
  //   if (SourvenirItems.length > 0) {
  //     dispatch(BuyItems(SourvenirItems));
  //     setSourvernirItems([]);
  //     setAddedSourvernirItems([]);
  //     closeModal();
  //   } else {
  //     setShowDrawer();
  //   }
  // };

  const Proceed = () => {
    dispatch(
      setCheckoutData({type: 'SOURVENIR', data: SourvenirItems, amount: amount})
    )
    setShowCheckout(true);
  }

  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
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
              {SourvenirItems.map(ele => (
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
            <Button bg='#00BFB2' color='white' onClick={() => Proceed()}>Proceed to checkout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default GiftListDrawer;
