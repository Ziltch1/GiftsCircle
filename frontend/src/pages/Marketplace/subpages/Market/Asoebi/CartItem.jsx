import {
  Box,
  Text,
  Image,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  Heading,
  Input,
  useDisclosure,
  FormLabel,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { AsoebiContext } from '.';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../../../redux/store';
import { DeleteAsoebi } from '../../../../../redux/features/events/service';
import Counter from '../../../../../components/Counter/Counter';

const CartItem = ({ item, id }) => {
  console.log(item, id);
  const [modalOpen, setModalOpen] = useState(false);
  const [increment, setIncrement] = useState(0);
  const {
    setAddedAsoebiItems,
    addForGuest,
    setAsoebiItems,
    AsoebiItems,
    addedAseobiItems, handleIncrement, handleDecrement
  } = useContext(AsoebiContext);

  const { asoebiItems, eventAsoebis } = useSelector(state => state.event);
  const asoebiItem = addForGuest
    ? asoebiItems.find(x => x.id === item.asoebiItem)
    : asoebiItems.find(x => x.id === item.ItemId);

  const MarkUpAsoebi = () => {
    AsoebiItems.map(ele => {
      if (ele.asoebiItem === item.asoebiItem) {
        ele.increment = increment;
      }
      return ele;
    });
    setAsoebiItems(AsoebiItems);
    setModalOpen(false);
  };

  const removeItem = asoebi => {
    if (asoebi.id) {
      dispatch(DeleteAsoebi(asoebi.id, asoebi.eventId));
      setAsoebiItems(prev => prev.filter(x => x.id !== asoebi.id));
      setAddedAsoebiItems(prev => prev.filter(x => x.id !== asoebiItem.id));
    } else {
      const filteredArray = AsoebiItems.filter(
        obj => obj.ItemId !== asoebiItem.id
      );
      setAsoebiItems(filteredArray);

      const filteredItems = addedAseobiItems.filter(
        obj => obj !== asoebiItem.id
      );
      setAddedAsoebiItems(filteredItems);
    }
  };

  return (
    <Box w="100%" h="auto" bg="#FAFAFA" p="4" mb="5">
      <ContributionAmount
        isOpen={modalOpen}
        setModalOpen={setModalOpen}
        setIncrement={setIncrement}
        increment={increment}
        handleSubmit={MarkUpAsoebi}
      />
      <Flex alignItems="center">
        <Box w="20%" m="3">
          <Image
            src={asoebiItem?.image}
            h="100px"
            w="120px"
            objectFit="cover"
            borderRadius={5}
          />
        </Box>

        <Box w="80%">
          <Box mb="2" display="flex" justifyContent="space-between">
            <Box w="75%">
              <Text fontWeight={600} fontSize={16} mb='4'>
                {asoebiItem?.title}
              </Text>
              {!addForGuest && (
                <Box display="flex" justifyContent="space-between">
                  <Text
                    color="#F5222D"
                    fontSize={14}
                    cursor="pointer"
                    onClick={() => removeItem(item)}
                  >
                    <DeleteIcon /> Remove from list
                  </Text>
                </Box>
              )}
            </Box>
            <Box>
              <Text fontWeight={600} fontSize={16} mb='3'>
                ₦ {item?.quantity ? asoebiItem?.amount * item?.quantity : asoebiItem?.amount}
              </Text>
              {!addForGuest && (
                <Counter quantity={item?.quantity} handleIncrement={handleIncrement} handleDecrement={handleDecrement} id={id} />
              )}
            </Box>
          </Box>

          {addForGuest && (
            <Box mb="2" display="flex" justifyContent="space-between">
              <Text w="75%" fontWeight={400} fontSize={16}>
                Purchase Price
              </Text>
              <Text fontWeight={400} fontSize={16}>
                ₦ {asoebiItem?.amount + item.increment}
              </Text>
            </Box>
          )}

          {addForGuest && !eventAsoebis.includes(item) && (
            <Box mb="2">
              <Button fontSize={14} bg='gray.400' onClick={() => setModalOpen(true)}>
                Markup Asoebi?
              </Button>
            </Box>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default CartItem;

export const ContributionAmount = ({
  setIncrement,
  increment,
  setModalOpen,
  isOpen,
  handleSubmit,
}) => {
  const { onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    <Box>
      <Modal
        isCentered
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent py="4" w="380px" h="auto">
          <ModalCloseButton onClick={() => setModalOpen(false)} />
          <ModalBody>
            <Heading
              mb="2"
              fontWeight="semibold"
              fontSize={22}
              textAlign="center"
            >
              How much do you want to Mark Up?
            </Heading>
            <Text mb='5'>This markup amount will be added to the original price for guests</Text>
            <Flex w="70%" mx="auto" justifyContent="space-between" mb="5">
              <Button
                bg="#CCF2F0"
                fontSize={13}
                fontWeight="medium"
                color="#00BFB2"
                borderRadius="100px"
                onClick={() => setIncrement(1000)}
              >
                1,000
              </Button>
              <Button
                bg="#CCF2F0"
                fontSize={13}
                fontWeight="medium"
                color="#00BFB2"
                borderRadius="100px"
                onClick={() => setIncrement(2000)}
              >
                2,000
              </Button>
              <Button
                bg="#CCF2F0"
                fontSize={13}
                fontWeight="medium"
                color="#00BFB2"
                borderRadius="100px"
                onClick={() => setIncrement(5000)}
              >
                5,000
              </Button>
            </Flex>
            <Box mb="5">
              <FormLabel fontSize={14}>Type amount here</FormLabel>
              <Input
                type="number"
                placeholder="Amount"
                fontSize={14}
                value={increment}
                onChange={e => setIncrement(parseInt(e.target.value))}
              />
            </Box>
            <Box textAlign="center">
              <Button
                mb="3"
                w="100%"
                bg="#00BFB2"
                fontSize={14}
                fontWeight="medium"
                color="white"
                onClick={() => handleSubmit()}
              >
                Proceed
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
