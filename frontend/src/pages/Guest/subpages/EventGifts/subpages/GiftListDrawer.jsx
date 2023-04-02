import React from 'react'
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

const GiftListDrawer = ({setShowListDrawer}) => {

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const btnRef = React.useRef();
  const cards = [1,2,3,4,5,6,7]
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
                          summary of Purchase
                      </Heading>
                  </DrawerHeader>

                  <DrawerBody>
                      <Flex justifyContent='space-between' flexWrap='wrap'>
                          {cards.map(ele => <GiftListItem />)}
                      </Flex>
                  </DrawerBody>
                  <DrawerFooter borderTop='1px solid lightgray'>
                      <Button fontSize={13} color='white' ml='5' fontWeight='medium' bg='#00BFB2'>Checkout (₦ 285,455)</Button>
                  </DrawerFooter>
              </DrawerContent>
          </Drawer>
      </Box>
  )
}

export default GiftListDrawer