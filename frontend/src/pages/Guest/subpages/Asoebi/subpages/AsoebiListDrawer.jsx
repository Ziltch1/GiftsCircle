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
  Heading,
  Flex,
  Button,
} from '@chakra-ui/react';
import GiftListItem from './AsoebiListItem';
import { GetAsoebiItemsApi } from '../../../../../redux/axios/apis/asoebi';
import PaymentButton from '../../../../../components/Buttons/PaymentButton';

const AsoebiListDrawer = ({ setShowListDrawer, asoebiCart, setAsoebiCart }) => {
  const [newAsoebi, setNewAsoebi] = useState([]);
  const [data, setData] = useState([]);

  const getAsoebi = async () => {
    try {
      const res = await GetAsoebiItemsApi();
      const data = await res.data;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

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
            <Flex justifyContent="space-between" flexWrap="wrap" mb="5">
              {newAsoebi.map(ele => (
                <GiftListItem
                  id={ele.id}
                  item={ele}
                  asoebiCart={asoebiCart}
                  setAsoebiCart={setAsoebiCart}
                />
              ))}
            </Flex>
            <Box mb="5" textAlign="right">
              <Heading fontWeight="medium" fontSize="18px" mb="2">
                Subtotal (₦{asoebiAmount})
              </Heading>
            </Box>
          </DrawerBody>
          <DrawerFooter borderTop="1px solid lightgray">
            <PaymentButton amount={asoebiAmount} action={closeModal} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AsoebiListDrawer;
