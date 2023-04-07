import React, {useState, useEffect} from 'react';
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
import { useSelector } from 'react-redux';

const GiftDrawer = ({ setOpenDrawer, data, setData, setAddedGiftItems, setGiftItems }) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [enableContribution, setEnableContribution] = useState(false);
  const {giftItems} = useSelector(state => state.gift)
  const [filteredGifts, setFilteredGifts] = useState([]);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const filtered = giftItems.filter(k =>
      data.some(j => j.giftItemId === k.id)
    );
    setFilteredGifts(filtered);

    const sumOfAmount = filtered.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.amount;
    }, 0);

    if (sumOfAmount !== amount) {
      setAmount(sumOfAmount)
    }
  }, [giftItems, data, amount]);


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
                <Text fontWeight={600} fontSize={18}>Total price: ₦{amount}</Text>
              </Box>
              <Box>
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text fontWeight={600} fontSize={18}>Enable contribution</Text>
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
