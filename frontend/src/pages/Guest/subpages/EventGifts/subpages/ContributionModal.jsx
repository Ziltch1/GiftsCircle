import React, { useContext, useState } from 'react';
import {
  Text,
  Heading,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  useDisclosure,
  Flex,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import errorImg from '../../../../assets/errorImg.svg';
import { CartContext } from '..';
import PaymentButton from '../../../../../components/Buttons/PaymentButton';


const ContributionModal = ({ setOpenModal, isOpen }) => {
  const {
    setContributionAmount,
    contributionAmount,
    currentItem,
    addedGiftItems,
    setGiftItems,
    GiftItems,
    setAddedGiftItems,
    setCurrentItem,
    setCheckContribution
  } = useContext(CartContext);
  const { onClose } = useDisclosure();
  const [contribution, setContribution] = useState(false);

  const HandleSubmit = () => {
    if (!addedGiftItems.includes(currentItem.id)) {
      setGiftItems([...GiftItems, currentItem]);
      setAddedGiftItems([...addedGiftItems, currentItem.id]);
      setCheckContribution(false)
    }
    setOpenModal(false);
  };

  

  const HandleContributeSubmit = () => {
    let updatedItem = { ...currentItem };
    updatedItem.contributionAmount = contributionAmount;
    setCurrentItem(updatedItem);
    if (contributionAmount > 0) {
      setCheckContribution(true)
    }
    if (!addedGiftItems.includes(currentItem.id)) {
      setGiftItems([...GiftItems, updatedItem]);
      setAddedGiftItems([...addedGiftItems, currentItem.id]);
      setOpenModal(false);
      setContribution(false);
      setCurrentItem(null);
      setContributionAmount(0);
    }
  };

  return (
    <Box>
      <ContributionAmount
        isOpen={contribution}
        setOpenModal={setContribution}
        setAmount={setContributionAmount}
        amount={contributionAmount}
        submitHandler={HandleContributeSubmit}
      />

      <Modal
        isCentered
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent py="4" w="380px" h="auto">
          <ModalCloseButton onClick={() => setOpenModal(false)} />
          <ModalBody>
            <Image src={errorImg} mb="3" display="block" mx="auto" />
            <Text mb="3" textAlign="center">
              Contribution is enabled for this product, you can pay in full or
              contribute to pay part of the total cost
            </Text>
            <Flex direction="column" w="85%" mx="auto">
              <Button
                mb="3"
                bg="#00BFB2"
                fontSize={14}
                fontWeight="medium"
                color="white"
                onClick={() => HandleSubmit()}
              >
                Pay in full
              </Button>
              <Button
                fontSize={14}
                fontWeight="medium"
                onClick={() => setContribution(true)}
              >
                Contribute
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ContributionModal;

export const ContributionAmount = ({
  setAmount,
  amount,
  isOpen,
  setOpenModal,
  submitHandler,
}) => {
  const { onClose } = useDisclosure();
  const closeModal = () => {
    setOpenModal(false);
    setAmount(0);
  };

  // const HandleSubmit = () => {
  //   submitHandler();
  // }



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
          <ModalCloseButton onClick={closeModal} />
          <ModalBody>
            <Heading
              mb="5"
              fontWeight="semibold"
              fontSize={24}
              textAlign="center"
            >
              How much do you want to contribute?
            </Heading>
            <Flex w="70%" mx="auto" justifyContent="space-between" mb="5">
              <Button
                bg="#CCF2F0"
                fontSize={13}
                fontWeight="medium"
                color="#00BFB2"
                borderRadius="100px"
                onClick={() => setAmount(1000)}
              >
                1,000
              </Button>
              <Button
                bg="#CCF2F0"
                fontSize={13}
                fontWeight="medium"
                color="#00BFB2"
                borderRadius="100px"
                onClick={() => setAmount(5000)}
              >
                5,000
              </Button>
              <Button
                bg="#CCF2F0"
                fontSize={13}
                fontWeight="medium"
                color="#00BFB2"
                borderRadius="100px"
                onClick={() => setAmount(10000)}
              >
                10,000
              </Button>
            </Flex>
            <Box mb="5">
              <FormLabel fontSize={14}>Type amount here</FormLabel>
              <Input
                type="text"
                placeholder="Amount"
                fontSize={14}
                value={amount}
                onChange={e => setAmount(parseInt(e.target.value))}
              />
            </Box>
            <Box textAlign="center">
              {/* <PaymentButton amount={amount} action={HandleSubmit} /> */}
              <Button
                mb="3"
                w="100%"
                bg="#00BFB2"
                fontSize={14}
                fontWeight="medium"
                color="white"
                onClick={() => submitHandler()}
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
