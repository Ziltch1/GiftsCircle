import React, { useContext } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import { CartContext } from '..';
import Checkout from '../Checkout';
import Header from '../../../../../components/Header/Header';

const AsoebiCheckoutDrawer = ({
  setShowAsoebiCheckout,
  setShowListDrawer,
  handleSubmit,
}) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const { amount, addedAsoebiItems } = useContext(CartContext);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size="full"
      closeOnOverlayClick={false}
      blockScrollOnMount={false}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Header />

        <DrawerBody w="100%" mx="auto" overflow="auto">
          <Checkout
            setShowAsoebiCheckout={setShowAsoebiCheckout}
            amount={amount}
            buyAsoebi={handleSubmit}
            showAsoebiDrawer={setShowListDrawer}
            cartLength={addedAsoebiItems.length}
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default AsoebiCheckoutDrawer;
