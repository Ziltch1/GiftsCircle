import React, {useState} from 'react'
import {Spinner, Modal, ModalOverlay, ModalContent, Box, ModalBody, ModalCloseButton, Button, Text, Heading, useDisclosure, Image} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import errorImg from '../../../assets/errorImg.svg';
import { DeleteEventApi } from '../../../../redux/axios/apis/events';
import {useSelector} from 'react-redux'

const DeleteModal = ({setShowModal}) => {
  const {isOpen, onClose} = useDisclosure({defaultIsOpen: true})
  const navigate = useNavigate();
  const {newEvent} = useSelector(state => state.event);
  const [loading, setLoading] = useState(false);

  const HandleSubmit = async () => {
    setLoading(true)
    try {
        await DeleteEventApi(newEvent?.id)
        navigate('/dashboard')
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
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
                                      {loading ? <Spinner /> : 'Yes delete event'}
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