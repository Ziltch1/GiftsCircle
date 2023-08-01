import React, { useEffect, useContext, useState } from 'react';
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
  Flex, Button
} from '@chakra-ui/react';
import GiftListItem from './GiftListItem';
import { useSelector } from 'react-redux';
import PaymentButton from '../../../../../components/Buttons/PaymentButton';
import { CartContext } from '..';
import ComplimentaryListItem from './ComplimentaryListItem';
import { dispatch } from '../../../../../redux/store';
import {
  BuyComplimentaryGifts,
  BuyGifts,
} from '../../../../../redux/features/gift/service';
import { CheckoutContext } from '../../..';

const GiftListDrawer = ({ setShowListDrawer, isOpen, setGiftDetails, checkContribution }) => {
  const { giftItems } = useSelector(state => state.gift);
  const { user } = useSelector(state => state.user);
  const { newEvent } = useSelector(state => state.event);
  const [quantity, setQuantity] = useState(1);

  const {
    complimentaryGifts,
    setAmount,
    ComplimentaryItems,
    setGiftItems,
    setComplimentaryItems,
    setAddedGiftItems,
    setAddedComplimentaryGiftItems,
    complimentaryGiftAmount,
    giftAmount,
    GiftItems,
    amount,
    setGiftAmount,
    setComplimentaryGiftAmount,
    deliveryPercent, setShowCheckout,
  } = useContext(CartContext);

  const {setCheckoutAmount, setCartLength, setDeliveryFee} = useContext(CheckoutContext);

  const handleIncrement = (id) => {
    setGiftItems((prevItems) =>
      prevItems.map((item) =>
        item.giftitemId === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setGiftItems((prevItems) =>
      prevItems.map((item) =>
        item.giftitemId === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  useEffect(() => {
    let complimentaryAmount = 0;
    let giftAmount = 0;
    ComplimentaryItems.forEach(ele => {
      const newData = complimentaryGifts?.find(x => x.id === ele?.id);
      complimentaryAmount = complimentaryAmount + newData.amount;
    });
    setComplimentaryGiftAmount(complimentaryAmount);
    let deliveryAmount = 0;
    GiftItems.forEach(ele => {
      const newData = giftItems?.find(x => x.id === ele?.giftitemId);

      let amount = ele.contributionAmount
        ? ele.contributionAmount
        : newData.amount;
      giftAmount = giftAmount + (amount * ele.quantity);
      deliveryAmount = deliveryAmount + giftAmount * (deliveryPercent / 100);
    });

    setGiftAmount(giftAmount);

    setAmount(complimentaryAmount + giftAmount + deliveryAmount);
    setCheckoutAmount(complimentaryAmount + giftAmount);
    setCartLength(GiftItems.length + ComplimentaryItems.length);
    setDeliveryFee(deliveryPercent);
  }, [ComplimentaryItems,setAmount,setComplimentaryGiftAmount,setGiftAmount,GiftItems]);


  const { onClose } = useDisclosure();
  const btnRef = React.useRef();


  const HandleSubmit = () => {
    const giftFormBody = [];
    GiftItems.forEach(item => {
      const newData = giftItems?.find(x => x.id === item?.giftitemId);
      let amount = item.contributionAmount
        ? item.contributionAmount
        : newData.amount;
      setQuantity(newData?.quantity)

      const formData = {
        status:
          amount + item.amountPaid >= newData.amount ? 'COMPLETED' : 'PARTIAL',
        giftId: item.id,
        userId: user.id,
        eventId: item.eventId,
        amountPaid: item.amountPaid,
        quantity: quantity ? quantity : 1,
        giftItemAmount: newData.amount,
        deliveryAmount: newData.amount * (deliveryPercent / 100),
        complimentaryGift:
          ComplimentaryItems.length > 0 ? ComplimentaryItems[0].id : '',
        amount: amount,
      };
      giftFormBody.push(formData);
    });

    if (giftFormBody.length > 0) {
      dispatch(BuyGifts(giftFormBody, giftFormBody[0].eventId));
      setGiftItems([]);
      setAddedGiftItems([]);
    }

    const complimenTaryFormBody = [];
    ComplimentaryItems.forEach(item => {
      const formData = {
        complimentarygiftId: item.id,
        userId: user.id,
        eventId: newEvent.id,
        amount: item.amount,
      };
      complimenTaryFormBody.push(formData);
    });

    if (complimenTaryFormBody.length > 0) {
      dispatch(BuyComplimentaryGifts(complimenTaryFormBody));
      setComplimentaryItems([]);
      setAddedComplimentaryGiftItems([]);
    }
    setShowListDrawer(false);
  };


  const proceedCheckout = () => {
    setShowCheckout(true)
  }

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
          <DrawerCloseButton onClick={() => setShowListDrawer(false)} />

          <DrawerHeader>
            <Heading fontWeight="medium" fontSize="25px" mb="2">
              Summary of Purchase
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            <Flex justifyContent="space-between" flexWrap="wrap" mb="5">
              {GiftItems.map(ele => {
                const newData = giftItems?.find(x => x.id === ele?.giftitemId);
                let amount = ele.contributionAmount
                  ? ele.contributionAmount
                  : newData.amount;
                return (
                  <GiftListItem id={ele.id} item={newData} data={ele} amount={amount} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />
                );
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
            {checkContribution === true ? (
              <PaymentButton amount={amount} action={HandleSubmit} />) 
            : 
            (<Button
                mb = "3"
                bg = "#00BFB2"
                fontSize = { 14 }
                fontWeight = "medium"
                color = "white"
                onClick = { proceedCheckout }
                // onClick={() => submitHandler()}
                w = 'auto'
                h = '50px'
              >
                Proceed to Checkout {giftAmount}
              </Button>)
            }
            
            
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default GiftListDrawer;
