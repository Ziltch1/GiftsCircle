import {
  Box,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import AudioModal from './AudioModal';
import VideoModal from '../../../../../../components/VideoRecorder/VideoModal';
import MessageModal from './MessageModal';

const Index = ({ setShowMediaOption, isOpen, setData }) => {
  const { onClose } = useDisclosure();
  const [audioModal, setAudioModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);

  const closeModal = () => {
    setShowMediaOption(false);
  };

  const [navPosition, setNavPosition] = useState(-1);
  const texts = ['Record Audio', 'Record Video', 'Written Message'];

  const handleClick = index => {
    setNavPosition(index);
  };

  useEffect(() => {
    switch (navPosition) {
      case 0:
        setAudioModal(true);
        break;
      case 1:
        setVideoModal(true);
        break;
      case 2:
        setMessageModal(true);
        break;
      default:
        break;
    }
  }, [navPosition]);

  const CloseModals = setModalClose => {
    setNavPosition(-1);
    setModalClose(false);
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
              <Box textAlign="center" mb="7">
                <VStack spacing={3}>
                  <Heading fontWeight={600} fontSize="23px" mb="3">
                    Record/Send Media to your Host?
                  </Heading>

                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {texts.map((text, index) => (
                      <Button
                        my="3"
                        fontWeight="medium"
                        fontSize={14}
                        color="white"
                        bg="#00BFB2"
                        onClick={() => handleClick(index)}
                      >
                        {text}
                      </Button>
                    ))}
                  </Stack>
                </VStack>
              </Box>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
      <AudioModal
        open={audioModal}
        setData={setData}
        setShowModal={() => CloseModals(setAudioModal)}
      />
      <VideoModal
        open={videoModal}
        setData={setData}
        setShowModal={() => CloseModals(setVideoModal)}
      />

      <MessageModal
        open={messageModal}
        setData={setData}
        setShowModal={() => CloseModals(setMessageModal)}
      />
    </>
  );
};

export default Index;
