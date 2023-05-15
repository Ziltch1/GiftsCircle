import React from 'react'
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
    Button, Stack, VStack
} from '@chakra-ui/react';
import { useRecorder } from 'react-recorder-voice'
import {FaMicrophone, FaStop, FaPause, FaTrash} from 'react-icons/fa'
import {BiSend} from 'react-icons/bi'

const AudioModal = ({setShowAudioModal}) => {
    const { audioURL, audioData, timer, recordingStatus, cancelRecording, saveRecordedAudio, startRecording } = useRecorder();
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const closeModal = () => {
        setShowAudioModal(false);
    };

  return (
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
                              Record Audio
                          </Heading>
                          <Text fontSize={14}>
                              Record an audio you want to send to your guests
                          </Text>

                          <Heading>00:{timer}</Heading>
                            <Text fontSize={25} textTransform='capitalize'>{recordingStatus}</Text>
                          <audio controls src={audioURL} ></audio>
                        </VStack>
                      </Box>

                      <Box textAlign="center">
                        <Stack spacing={3} direction='row' justifyContent='center'>
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
                              onClick={saveRecordedAudio}
                          >
                              <BiSend />
                          </Button>
                          </Stack>
                      </Box>
                  </ModalBody>
              </Box>
          </ModalContent>
      </Modal>
  )
}

export default AudioModal