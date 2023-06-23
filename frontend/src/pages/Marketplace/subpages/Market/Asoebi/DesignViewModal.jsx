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
  setShowProducts,
}) => {
  const { onClose } = useDisclosure({ defaultIsOpen: true });
  const HandleSubmit = option => {
    if(option === true){
      setShowModal(false);
      setAddForGuest(option);
    }else{
      setShowAsoebi(true);
      setShowModal(false);
      setAddForGuest(option);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowProducts(false);
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
            <ModalCloseButton onClick={closeModal} />
            <ModalBody>
              <Box textAlign="center" mb="4">
                <Heading fontWeight={600} fontSize="25px" mb="3">
                  Add Asoebi
                </Heading>
                <Text fontSize={14}>
                  Do you want to add the asoebi for guest or buy for
                  yourself?
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
                  Buy for yourself
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
