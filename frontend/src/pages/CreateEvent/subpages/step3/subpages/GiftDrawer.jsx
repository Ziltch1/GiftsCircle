import React, {useState} from 'react';
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
  Heading, DrawerFooter, Switch, Flex
} from '@chakra-ui/react';
import GiftItem from './GiftItem';

const GiftDrawer = ({ setOpenDrawer, data, setData, setAddedGiftItems, setGiftItems }) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [enableContribution, setEnableContribution] = useState(false);
  const btnRef = React.useRef();
  const closeModal = () => {
    setOpenDrawer(false);
  };

  const handleClick = () => {
    setEnableContribution(!enableContribution)
    console.log('clicked', enableContribution);
  }
  console.log(enableContribution);
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
          <Box textAlign='left' p='8'>
           <Flex direction='column'>
              <Box mb='5'>
                <Text>Total price: </Text>
              </Box>
              <Box>
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text>Enable contribution</Text>
                  <Box onClick={handleClick}>
                    <Switch colorScheme='teal' />
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
