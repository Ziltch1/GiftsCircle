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
import GiftListItem from './AsoebiListItem';
import { useSelector } from 'react-redux';
import { GetAsoebiItemsApi } from '../../../../../redux/axios/apis/asoebi';

const AsoebiListDrawer = ({setShowListDrawer, asoebiCart, setAsoebiCart,}) => {
  const [newAsoebi, setNewAsoebi] = useState([]);
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

  let asoebiAmount = 0;


    useEffect(() => {
        const asoebiCartSet = new Set(asoebiCart);
        const filteredArray = data.filter(obj => asoebiCartSet.has(obj.id));
        setNewAsoebi(filteredArray);
    }, [asoebiCart, data]);

 asoebiAmount = newAsoebi?.reduce((acc, curr) => acc + curr.amount, 0);

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
                          {newAsoebi.map(ele => <GiftListItem id={ele.id} item={ele} asoebiCart={asoebiCart} setAsoebiCart={setAsoebiCart} />)}
                      </Flex>
                      <Box mb='5' textAlign='right'>
                          <Heading fontWeight="medium" fontSize="18px" mb="2">
                              Subtotal (₦{asoebiAmount})
                          </Heading>
                      </Box>
                  </DrawerBody>
                  <DrawerFooter borderTop='1px solid lightgray'>
                      <Button fontSize={13} color='white' ml='5' fontWeight='medium' bg='#00BFB2'>Checkout (₦{asoebiAmount})</Button>
                  </DrawerFooter>
              </DrawerContent>
          </Drawer>
      </Box>
  )
}

export default AsoebiListDrawer