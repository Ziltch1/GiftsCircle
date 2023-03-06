import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import GiftItem from './GiftItem';
import { useSelector } from 'react-redux';

const GiftDrawer = ({ setOpenDrawer }) => {
  const { eventGifts } = useSelector(state => state.event);
  const [data, setData] = useState([]);

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const btnRef = React.useRef();
  const closeModal = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    setData(eventGifts);
  }, [eventGifts]);

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
              Gift List ({data.length})
            </Heading>
            <Text fontWeight="medium" fontSize="14px">
              Find all the gifts you have added here...
            </Text>
          </DrawerHeader>

          <DrawerBody>
            {data.map(ele => (
              <GiftItem gift={ele} key={data.indexOf(ele)} setData={setData} />
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default GiftDrawer;
