import React, {useState, useEffect, useC} from 'react'
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
    Heading, Flex, Image, Button
} from '@chakra-ui/react';
import GiftListItem from './GiftListItem';
import { useSelector } from 'react-redux';
import { GetAsoebiItemsApi } from '../../../../../redux/axios/apis/asoebi';

const GiftListDrawer = ({setShowListDrawer, asoebiCart, setAsoebiCart,}) => {
  const [newGifts, setNewGifts] = useState([]);
  const [data, setData] = useState([]);

  const getAsoebi = async() => {
    try {
      const res = await GetAsoebiItemsApi();
      const data = await res.data;
      setData(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAsoebi();
  }, []);

  let giftAmount = 0;

  console.log(data, asoebiCart);


    useEffect(() => {
        const asoebiCartSet = new Set(asoebiCart);
        const filteredArray = data.filter(obj => asoebiCartSet.has(obj.id));
        setNewGifts(filteredArray);
    }, [asoebiCart, data]);

  console.log(newGifts);

 giftAmount = newGifts?.reduce((acc, curr) => acc + curr.amount, 0);

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
                      <Flex justifyContent='space-between' flexWrap='wrap' mb='5'>
                          {newGifts.map(ele => <GiftListItem id={ele.id} item={ele} newGifts={newGifts} setNewGifts={setNewGifts} asoebiCart={asoebiCart} setAsoebiCart={setAsoebiCart} />)}
                      </Flex>
                      <Box mb='5' textAlign='right'>
                          <Heading fontWeight="medium" fontSize="18px" mb="2">
                              Subtotal (₦{giftAmount})
                          </Heading>
                      </Box>
                  </DrawerBody>
                  <DrawerFooter borderTop='1px solid lightgray'>
                      <Button fontSize={13} color='white' ml='5' fontWeight='medium' bg='#00BFB2'>Checkout (₦{giftAmount})</Button>
                  </DrawerFooter>
              </DrawerContent>
          </Drawer>
      </Box>
  )
}

export default GiftListDrawer