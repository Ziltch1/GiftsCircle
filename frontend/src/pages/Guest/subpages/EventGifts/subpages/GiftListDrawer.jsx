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
  Text,
  Heading,
  Flex,
  Image,
  Button,
} from '@chakra-ui/react';
import GiftListItem from './GiftListItem';
import { useSelector } from 'react-redux';

const GiftListDrawer = ({
  setShowListDrawer,
  giftCart,
  setGiftCart,
  complimentaryCart,
  setComplimentaryCart,
  data,
}) => {
  const [newGifts, setNewGifts] = useState([]);
  const [complimentary, setComplimentary] = useState([]);
  const { giftItems } = useSelector(state => state.gift);

  let giftAmount = 0;
  let complimentaryAmount = 0;

  useEffect(() => {
    const filteredArray = giftItems.filter(obj => giftCart.includes(obj.id));
    setNewGifts(filteredArray);
  }, [giftCart]);

  useEffect(() => {
    const newFilteredArray = data.filter(obj =>
      complimentaryCart.includes(obj.id)
    );
    setComplimentary(newFilteredArray);
  }, [complimentaryCart]);

  giftAmount = newGifts?.reduce((acc, curr) => acc + curr.amount, 0);
  complimentaryAmount = complimentary?.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

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
              {newGifts.map(ele => (
                <GiftListItem
                  id={ele.id}
                  item={ele}
                  newGifts={newGifts}
                  setNewGifts={setNewGifts}
                  giftCart={giftCart}
                  setGiftCart={setGiftCart}
                />
              ))}
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
              {complimentary.map(ele => (
                <GiftListItem
                  id={ele.id}
                  item={ele}
                  newGifts={newGifts}
                  setNewGifts={setNewGifts}
                  giftCart={complimentaryCart}
                  setGiftCart={setComplimentaryCart}
                />
              ))}
            </Flex>

            <Box mb="5" textAlign="right">
              <Heading fontWeight="medium" fontSize="18px" mb="2">
                Subtotal (₦{complimentaryAmount})
              </Heading>
            </Box>
          </DrawerBody>
          <DrawerFooter borderTop="1px solid lightgray">
            <Button
              fontSize={13}
              color="white"
              ml="5"
              fontWeight="medium"
              bg="#00BFB2"
            >
              Checkout (₦{giftAmount + complimentaryAmount})
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default GiftListDrawer;
