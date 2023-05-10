import {
  Modal,
  Box,
  ModalBody,
  ModalCloseButton,
  Heading,
  Text,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import React from 'react';

const LoadingModal = ({ setShowModal, open }) => {
  const { onClose } = useDisclosure({ defaultIsOpen: true });
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={open}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxW="420px" bg="white" py="8" px="6">
          <Box>
            <ModalCloseButton onClick={() => setShowModal(false)} />
            <ModalBody>
              <Box textAlign="center" mb="4">
                <Heading fontWeight={600} fontSize="25px" mb="3">
                  File Uploading
                </Heading>
                <Text>Please wait...</Text>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="xl"
                />
              </Box>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoadingModal;
