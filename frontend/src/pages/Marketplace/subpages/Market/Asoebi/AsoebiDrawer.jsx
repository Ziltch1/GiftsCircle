import React, { useContext, useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Text,
  Heading,
  Flex,
  Button,
} from '@chakra-ui/react';
import { AsoebiContext } from '.';
import CartItem from './CartItem';
import { AddManyEventAsoebiApi } from '../../../../../redux/axios/apis/asoebi';
import { dispatch } from '../../../../../redux/store';
import { GetEventAsoebis } from '../../../../../redux/features/events/service';
import { setCheckoutData } from '../../../../../redux/features/marketplace/marketSlice';
import ConfirmationModal from './ConfirmationModal';

const AsoebiDrawer = ({ openDrawer, setOpenDrawer, eventId, setShowCheckout }) => {
  const [showModal, setShowModal] = useState(false)
  const { onClose } = useDisclosure({ defaultIsOpen: true });

  const {
    data,
    AsoebiItems,
    setAsoebiItems,
    addForGuest,
    amount,
  } = useContext(AsoebiContext);

  const btnRef = React.useRef();
  const closeModal = () => {
    setOpenDrawer(false);
  };

  const buyAsoebi = async() => {
    try {
      let res = await AddManyEventAsoebiApi(AsoebiItems);
      if (res.data) {
        dispatch(GetEventAsoebis(eventId));
        setAsoebiItems([]);
        setOpenDrawer(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const HandleSubmit = async () => {
    setShowModal(true)
  };

  const Proceed = () => {
    dispatch(
      setCheckoutData({ type: 'ASOEBI', data: AsoebiItems, amount: amount })
    );
    setShowCheckout(true);
  };

  return (
    <Box>
      {showModal && <ConfirmationModal setShowModal={setShowModal} buyAsoebi={buyAsoebi} setOpenDrawer={setOpenDrawer} />}
      <Drawer
        isOpen={openDrawer}
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
              Asoebi List ({data.length})
            </Heading>
            <Text fontWeight="medium" fontSize="14px" mb='2'>
              Find all the asoebis you have added here...
            </Text>
            <Text fontWeight="medium" fontSize="14px">Note: Markup price is the amount your guest will pay</Text>
          </DrawerHeader>

          <DrawerBody>
            {data.map(ele => (
              <CartItem item={ele} key={data.indexOf(ele)} id={ele.ItemId} />
            ))}
          </DrawerBody>
          {!addForGuest && (
            <Box
              p="8"
              display="flex"
              justifyContent="space-between"
              fontWeight="700"
              fontSize="18px"
            >
              <Text>Total Amount</Text>
              <Text>N {amount}</Text>
            </Box>
          )}
          <Box textAlign="left" p="8">
            <Flex justifyContent="flex-end">
              {addForGuest ? (
                <Button
                  bg="#00BFB2"
                  color="white"
                  onClick={() => HandleSubmit()}
                >
                  Save Changes
                </Button>
              ) : (
                <Button bg='#00BFB2' color='white' onClick={() => Proceed()}>Proceed to checkout</Button>
              )}
            </Flex>
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AsoebiDrawer;
