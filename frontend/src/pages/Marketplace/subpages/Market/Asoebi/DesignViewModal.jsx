import {
  Modal,
  Box,
  Button,
  ModalBody,
  ModalCloseButton,
  Heading,
  Text,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

const DesignViewModal = ({
  modalOpen,
  setShowModal,
  setShowAsoebi,
  setAddForGuest,
}) => {
  const { onClose } = useDisclosure({ defaultIsOpen: true });
  const HandleSubmit = option => {
    setShowAsoebi(true);
    setShowModal(false);
    setAddForGuest(option);
  };
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={modalOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxW="420px" bg="white" py="8" px="6">
          <Box>
            <ModalCloseButton onClick={() => setShowModal(false)} />
            <ModalBody>
              <Box textAlign="center" mb="4">
                <Heading fontWeight={600} fontSize="25px" mb="3">
                  Asoebi Addition
                </Heading>
                <Text fontSize={14}>
                  Do you really want to add the asoebi for guest or buy for
                  oneself?
                </Text>
              </Box>

              <Box
                alignItems="center"
                justifyContent="center"
                display="flex"
                gap="5"
              >
                <Button
                  fontWeight="medium"
                  fontSize={14}
                  color="white"
                  bg="#00BFB2"
                  onClick={() => HandleSubmit(true)}
                >
                  Add for Guest
                </Button>

                <Button
                  fontWeight="medium"
                  fontSize={14}
                  color="white"
                  bg="#00BFB2"
                  onClick={() => HandleSubmit(false)}
                >
                  Buy for self
                </Button>
              </Box>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DesignViewModal;
