import React, { useContext, useState } from 'react';
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
import ContributionModal from './ContributionModal';
import DisplayCard from '../../../../../components/Card';
import { CartContext } from '..';

const ComplimentaryModal = ({ setOpenDrawer, isOpen }) => {
  const { onClose } = useDisclosure();
  const [openModal, setOpenModal] = useState(false);
  const btnRef = React.useRef();
  const {
    complimentaryGifts,
    setAddedComplimentaryGiftItems,
    setComplimentaryItems,
    addedComplimentaryGiftItems,
    ComplimentaryItems, setShowPrompt, setIsComplimentary
  } = useContext(CartContext);
  const closeModal = () => {
    setOpenDrawer(false);
  };

  const addGift = id => {
    setIsComplimentary(true)
    setShowPrompt(true);
    let newItem = complimentaryGifts.find(x => x.id === id);
    if (!addedComplimentaryGiftItems.includes(newItem.id)) {
      setComplimentaryItems([...ComplimentaryItems, newItem]);
      setAddedComplimentaryGiftItems([
        ...addedComplimentaryGiftItems,
        newItem.id,
      ]);
    }
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
              Add complimentary Gift (optional)
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            <Flex justifyContent="space-between" flexWrap="wrap">
              {complimentaryGifts.map(item => (
                <>
                  {openModal && (
                    <ContributionModal
                      setOpenModal={setOpenModal}
                      contribute={item.enableContribution}
                    />
                  )}
                  <DisplayCard
                    id={item.id}
                    data={item}
                    action={addGift}
                    disabled={addedComplimentaryGiftItems.includes(item?.id)}
                    text="Purchase"
                    complimentaryGift={true}
                  />
                </>
              ))}
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Button
              onClick={closeModal}
              fontSize={13}
              fontWeight="medium"
              w="150px"
            >
              Skip
            </Button>
            <Button
              onClick={closeModal}
              fontSize={13}
              color="white"
              ml="5"
              fontWeight="medium"
              w="150px"
              bg="#00BFB2"
            >
              Proceed
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default ComplimentaryModal;
