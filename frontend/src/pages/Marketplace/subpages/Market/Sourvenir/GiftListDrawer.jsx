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
import { SourvenirContext } from '.';
import { dispatch } from '../../../../../redux/store';
import { BuyItems } from '../../../../../redux/features/marketplace/service';

const GiftListDrawer = ({ setShowDrawer }) => {
  const { SourvenirItems, setSourvenirItems, amount } =
    useContext(SourvenirContext);
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const btnRef = React.useRef();

  const closeModal = () => {
    setShowDrawer(false);
  };

  const HandleSubmit = () => {
    if (SourvenirItems.length > 0) {
      dispatch(BuyItems(SourvenirItems));
      setSourvenirItems([]);
      setShowDrawer(false);
    } else {
      setShowDrawer(false);
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
              {SourvenirItems.map(ele => (
                <GiftListItem id={ele.id} item={ele} />
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
