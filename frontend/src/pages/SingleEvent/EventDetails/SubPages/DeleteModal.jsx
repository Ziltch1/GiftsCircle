import React from 'react'
import {Modal, ModalOverlay, ModalContent, Box, ModalBody, ModalCloseButton, Button, Text, Heading, useDisclosure, Image} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import errorImg from '../../../assets/errorImg.svg';


const DeleteModal = ({setShowModal}) => {
  const {isOpen, onClose} = useDisclosure({defaultIsOpen: true})
  const navigate = useNavigate();

  const HandleSubmit = async () => {
    try {
        navigate('/dashboard')
    } catch (error) {
        console.log(error)
    }
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
              <ModalContent maxW="420px" bg="white" py="8" px="6">
                  <Box>
                      <ModalCloseButton onClick={() => setShowModal(false)} />
                      <ModalBody>
                          <Image src={errorImg} display="block" mx="auto" mb="3" />
                          <Box textAlign="center" mb="4">
                              <Heading fontWeight={600} fontSize="25px" mb="3">
                                  Delete Event!
                              </Heading>
                              <Text fontSize={14}>
                                  Are you sure you want to delete this event?
                              </Text>
                          </Box>

                          <Box textAlign="center">
                                  <Button
                                      fontWeight="medium"
                                      fontSize={14}
                                      color="white"
                                      bg='red.500'
                                    //   bg="#00BFB2"
                                      onClick={() => HandleSubmit()}
                                  >
                                      Yes delete event
                                  </Button>
                          </Box>
                      </ModalBody>
                  </Box>
              </ModalContent>
          </Modal>
   </>
  )
}

export default DeleteModal