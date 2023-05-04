import React, { useContext } from 'react';
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
// import GiftItem from './GiftItem';
import { AsoebiContext } from '.';
import CartItem from './CartItem';

const AsoebiDrawer = ({ openDrawer, setOpenDrawer }) => {
  const { onClose } = useDisclosure({ defaultIsOpen: true });

  const { AsoebiItems } = useContext(AsoebiContext);

  const btnRef = React.useRef();
  const closeModal = () => {
    setOpenDrawer(false);
  };

  return (
    <Box>
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
              Asoebi List ({AsoebiItems.length})
            </Heading>
            <Text fontWeight="medium" fontSize="14px">
              Find all the asoebis you have added here...
            </Text>
          </DrawerHeader>

          <DrawerBody>
            {AsoebiItems.map(ele => (
              <CartItem item={ele} key={ele?.asoebiItem} />
            ))}
          </DrawerBody>
          <Box textAlign="left" p="8">

            <Flex justifyContent="flex-end">
              <Button bg="#00BFB2" color="white">
                Save Changes
              </Button>
            </Flex>
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AsoebiDrawer;
