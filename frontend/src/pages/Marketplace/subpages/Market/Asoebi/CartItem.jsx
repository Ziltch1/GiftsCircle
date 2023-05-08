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

const CartItem = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [increment, setIncrement] = useState(0);
  const { setAddedAsoebiItems, addForGuest, setAsoebiItems, AsoebiItems } =
    useContext(AsoebiContext);

  const { asoebiItems, eventAsoebis } = useSelector(state => state.event);
  const asoebiItem = asoebiItems.find(x => x.id === item.asoebiItem);

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
      setAsoebiItems(prev => prev.filter(x => x.asoebiItem !== asoebiItem.id));
      setAddedAsoebiItems(prev =>
        prev.filter(x => x.asoebiItem !== asoebiItem.id)
      );
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
            src={asoebiItem.image}
            h="100px"
            w="120px"
            objectFit="cover"
            borderRadius={5}
          />
        </Box>

        <Box w="80%">
          <Box mb="2" display="flex" justifyContent="space-between">
            <Text w="75%" fontWeight={600} fontSize={16}>
              {asoebiItem.title}
            </Text>
            <Text fontWeight={600} fontSize={16}>
              ₦ {asoebiItem.amount}
            </Text>
          </Box>

          {addForGuest && (
            <Box mb="2" display="flex" justifyContent="space-between">
              <Text w="75%" fontWeight={400} fontSize={16}>
                Purchase Price
              </Text>
              <Text fontWeight={400} fontSize={16}>
                ₦ {asoebiItem.amount + item.increment}
              </Text>
            </Box>
          )}

          {addForGuest && !eventAsoebis.includes(item) && (
            <Box mb="2">
              <Button fontSize={14} onClick={() => setModalOpen(true)}>
                Markup Asoebi?
              </Button>
            </Box>
          )}

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
              mb="5"
              fontWeight="semibold"
              fontSize={24}
              textAlign="center"
            >
              How much do you want to Mark Up?
            </Heading>
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
