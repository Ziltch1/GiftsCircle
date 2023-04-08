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
  Switch,
  Flex,
} from '@chakra-ui/react';
import GiftItem from './GiftItem';

const GiftDrawer = ({
  setOpenDrawer,
  data,
  setData,
  setAddedGiftItems,
  setGiftItems,
  totalAmount,
  setEnableContribution,
}) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const btnRef = React.useRef();
  const closeModal = () => {
    setOpenDrawer(false);
  };

  const handleClick = () => {
    setEnableContribution(prev => !prev);
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
              <GiftItem
                gift={ele}
                key={data.indexOf(ele)}
                setData={setData}
                setAddedGiftItems={setAddedGiftItems}
                setGiftItems={setGiftItems}
              />
            ))}
          </DrawerBody>
          <Box textAlign="left" p="8">
            <Flex direction="column">
              <Box mb="5">
                <Text fontWeight={600} fontSize={18}>
                  Total price: ₦{totalAmount}
                </Text>
              </Box>
              <Box>
                <Flex alignItems="center" justifyContent="space-between">
                  <Text fontWeight={600} fontSize={18}>
                    Enable contribution
                  </Text>
                  <Box>
                    <Switch colorScheme="teal" onChange={() => handleClick()}/>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default GiftDrawer;
