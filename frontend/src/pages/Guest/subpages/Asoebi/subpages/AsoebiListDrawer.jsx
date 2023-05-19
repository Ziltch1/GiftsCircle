import React, { useEffect, useContext } from 'react';
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
import GiftListItem from './AsoebiListItem';
import PaymentButton from '../../../../../components/Buttons/PaymentButton';
import { CartContext } from '..';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../../../redux/store';
import { BuyEventAsoebi } from '../../../../../redux/features/events/service';

const AsoebiListDrawer = ({ setShowListDrawer }) => {
  const {
    AsoebiItems,
    amount,
    setAmount,
    asoebiItems,
    setAddedAsoebiItems,
    setAsoebiItems,
  } = useContext(CartContext);
  const { user } = useSelector(state => state.user);
  const { newEvent } = useSelector(state => state.event);

  useEffect(() => {
    let totalAmount = 0;
    AsoebiItems.forEach(ele => {
      const newData = asoebiItems?.find(x => x.id === ele?.asoebiItem);
      totalAmount = totalAmount + newData.amount;
    });
    setAmount(totalAmount);
  }, [AsoebiItems, setAmount]);

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const btnRef = React.useRef();

  const closeModal = () => {
    setShowListDrawer(false);
  };

  const HandleSubmit = () => {
    AsoebiItems.forEach(async ele => {
      const amount = asoebiItems?.find(x => x.id === ele?.asoebiItem).amount;
      const formData = {
        amount: amount,
        asoebiId: ele.id,
        userId: user.id,
        eventId: newEvent.id,
        quantity: 1,
      };
      dispatch(BuyEventAsoebi(formData));
    });
    setShowListDrawer(false);
    setAddedAsoebiItems([]);
    setAsoebiItems([]);
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
              {AsoebiItems.map(ele => (
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

export default AsoebiListDrawer;
