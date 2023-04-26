import React from 'react';
import {
  Box,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  Image,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import errorImg from '../../../assets/errorImg.svg';
import { dispatch } from '../../../../redux/store';
import { StopFundRaising } from '../../../../redux/features/events/service';

const CancelModal = ({ setOpenModal, id }) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const closeModal = () => {
    setOpenModal(false);
  };

  const HandleSubmit = () => {
    const formBody = {
      id: id,
      status: false,
    };
    dispatch(StopFundRaising(formBody));
    setOpenModal(false);
  };
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxW="400px" bg="white" p="3">
          <Box>
            <ModalCloseButton onClick={closeModal} />
            <ModalBody>
              <Image src={errorImg} display="block" mx="auto" mb="3" />
              <Box textAlign="center" mb="4">
                <Heading fontWeight={600} fontSize="23px" mb="3">
                  Stop Fundraising?
                </Heading>
                <Text fontSize={14}>
                  Are you sure you want to stop fundraising? You will not be
                  able to continue if you stop it
                </Text>
              </Box>

              <Box textAlign="center">
                <Button
                  fontWeight="medium"
                  fontSize={14}
                  color="white"
                  bg="#00BFB2"
                  onClick={() => HandleSubmit()}
                >
                  Yes, proceed
                </Button>
              </Box>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CancelModal;
