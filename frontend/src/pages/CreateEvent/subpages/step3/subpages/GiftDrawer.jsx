import React from 'react';
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

const GiftDrawer = ({ setOpenDrawer, data, setData }) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const btnRef = React.useRef();
  const closeModal = () => {
    setOpenDrawer(false);
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
