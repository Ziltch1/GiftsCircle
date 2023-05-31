import React, { useState, useEffect } from 'react';
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
                <Button
                  fontWeight="medium"
                  fontSize={14}
                  color="white"
                  bg="#00BFB2"
                  onClick={cancelRecording}
                >
                  <FaTrash />
                </Button>
                <Button
                  fontWeight="medium"
                  fontSize={16}
                  color="white"
                  bg="#00BFB2"
                  onClick={startRecording}
                >
                  <FaMicrophone />
                </Button>
                <Button
                  fontWeight="medium"
                  fontSize={16}
                  color="white"
                  bg="#00BFB2"
                  onClick={() => SendFile()}
                >
                  <BiSend />
                </Button>
              </Stack>
            </Box>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default AudioModal;
