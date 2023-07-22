import React, { useContext, useState } from 'react';
import {
    Text,
    Heading,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Button,
    Image,
    useDisclosure,
    Flex,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import errorImg from '../../../../assets/errorImg.svg';

const Prompt = ({setShowPrompt, setShowListDrawer, setOpenDrawer, isComplimentary, openDrawer, contributionModal}) => {
  const { onClose, isOpen } = useDisclosure({defaultIsOpen: true});

  const showCart = () => {
    setShowPrompt(false)
    setShowListDrawer(true);
    if(openDrawer === true){
      setOpenDrawer(false)
    }
  }

  const showComplimentary = () => {
    setShowPrompt(false)
    setOpenDrawer(true)
  }

  return (
      <Box>
          <Modal
              isCentered
              closeOnOverlayClick={false}
              onClose={onClose}
              isOpen={isOpen}
          >
              <ModalOverlay />
              <ModalContent py="4" w="380px" h="auto">
                  <ModalCloseButton onClick={() => setShowPrompt(false)} />
                  <ModalBody>
                      <Image src={errorImg} mb="3" display="block" mx="auto" />
                      
                          <Text mb="2" textAlign="center">
                             Please choose an action
                          </Text>
                      

                      <Flex direction="column" w="85%" mx="auto">
                          <Button
                              mb="3"
                              bg="#00BFB2"
                              fontSize={14}
                              fontWeight="medium"
                              color="white"
                              onClick={showCart}
                          >
                              Proceed to cart
                          </Button>
                          <Button
                              fontSize={14}
                              fontWeight="medium"
                              mb='3'
                              bg={!isComplimentary ? '#00BFB2' : null}
                              color={!isComplimentary ? 'white' : 'black'}
                              onClick={() => setShowPrompt(false)}
                          >
                              Add another gift
                          </Button>
                          {!isComplimentary && 
                              <Button
                                  mb="3"
                                  fontSize={14}
                                  fontWeight="medium"
                                  onClick={showComplimentary}
                              >
                                  Add a complimentary gift
                              </Button>
                          }
                      </Flex>
                  </ModalBody>
              </ModalContent>
          </Modal>
      </Box>
  )
}

export default Prompt