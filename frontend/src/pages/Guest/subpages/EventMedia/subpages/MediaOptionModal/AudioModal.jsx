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
  useDisclosure,
  Button,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { useRecorder } from 'react-recorder-voice';
import { FaMicrophone, FaTrash } from 'react-icons/fa';
import { BiSend } from 'react-icons/bi';

const AudioModal = ({ setShowModal, open, setData }) => {
  const {
    audioURL,
    audioData,
    timer,
    recordingStatus,
    cancelRecording,
    saveRecordedAudio,
    startRecording,
  } = useRecorder();
  const { onClose } = useDisclosure();

  const blobToFile = (audioData, fileName) => {
    return new File([audioData], fileName, {
      lastModified: new Date().getTime(),
      type: audioData?.type,
    });
  };

  const SendFile = () => {
    saveRecordedAudio();
    setTimeout(() => {
      const convertedFile = blobToFile(audioData, 'audio.mp3');
      setData(convertedFile);
      setShowModal(false);
    }, 1000);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      onClose={onClose}
      isOpen={open}
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
                  Record Audio
                </Heading>
                <Text fontSize={14}>
                  Record an audio you want to send to your guests
                </Text>

                <Heading>00:{timer}</Heading>
                <Text fontSize={25} textTransform="capitalize">
                  {recordingStatus}
                </Text>
                <audio controls src={audioURL}></audio>
              </VStack>
            </Box>

            <Box textAlign="center">
              <Stack spacing={3} direction="row" justifyContent="center">
                <Box>
                  <Button
                    fontWeight="medium"
                    color="white"
                    bg="#00BFB2"
                    onClick={cancelRecording}
                    mb='2.5'
                    borderRadius='50%'
                    w='40px'
                    h='40px'
                    p='3.5'
                  >
                    <FaTrash style={{fontSize: '30px'}} />
                  </Button>
                  <Text>Delete</Text>
                </Box>
               <Box>
                  <Button
                    fontWeight="medium"
                    fontSize={16}
                    color="white"
                    bg="#00BFB2"
                    onClick={startRecording}
                    mb='2.5'
                    borderRadius='50%'
                    w='40px'
                    h='40px'
                    p='3.5'
                  >
                    <FaMicrophone style={{ fontSize: '30px' }} />
                  </Button>
                  <Text>Record</Text>
               </Box>
               <Box>
                  <Button
                    fontWeight="medium"
                    color="white"
                    bg="#00BFB2"
                    onClick={() => SendFile()}
                    mb='2.5'
                    borderRadius='50%'
                    w='40px'
                    h='40px'
                    p='3.5'
                  >
                    <BiSend style={{ fontSize: '35px' }} />
                  </Button>
                  <Text>Stop/Send</Text>
               </Box>
              </Stack>
            </Box>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default AudioModal;
