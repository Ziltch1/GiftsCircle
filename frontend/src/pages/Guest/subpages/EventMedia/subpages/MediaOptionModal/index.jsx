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
import React, { useEffect, useState } from 'react'
import AudioModal from './AudioModal';
import VideoModal from './VideoModal';
import MessageModal from './MessageModal';

const Index = ({setShowMediaOption}) => {

  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const closeModal = () => {
    setShowMediaOption(false);
  };

  const [navPosition, setNavPosition] = useState(-1);
  const texts = ['Record Audio', 'Redord Video', "Send Message"];

  const handleClick = (index) => {
    setNavPosition(index)
  }

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
                
                <Stack direction='row' flexWrap='wrap' justifyContent='center' alignItems='center'>
                  {texts.map((text, index) => <Button my='3' fontWeight="medium" fontSize={14} color="white" bg="#00BFB2" onClick={() => handleClick(index)}>{text}</Button>)}
                </Stack>
              </VStack>
            </Box>
          </ModalBody>
        </Box>
      </ModalContent>
    </Modal>
      {navPosition === 0 && <AudioModal setNavPosition={setNavPosition} />}
      {navPosition === 1 && <VideoModal setNavPosition={setNavPosition} />}
      {navPosition === 2 && <MessageModal setNavPosition={setNavPosition} setShowMediaOption={setShowMediaOption} />}
    </>
  )
}

export default Index
