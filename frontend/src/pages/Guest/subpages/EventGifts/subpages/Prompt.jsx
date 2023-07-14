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

const Prompt = ({setShowPrompt, setShowListDrawer, setOpenDrawer}) => {
  const { onClose, isOpen } = useDisclosure({defaultIsOpen: true});

  const showCart = () => {
    setShowPrompt(false)
    setShowListDrawer(true)
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
                      <Text mb="3" textAlign="center">
                          Contribution is enabled for this product, you can pay in full or
                          contribute to pay part of the total cost
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
                              bg="#00BFB2"
                              color='white'
                              onClick={() => setShowPrompt(false)}
                          >
                              Add another gift
                          </Button>
                          <Button
                              mb="3"
                              fontSize={14}
                              fontWeight="medium"
                              onClick={showComplimentary}
                          >
                              Add a complimentary gift
                          </Button>
                      </Flex>
                  </ModalBody>
              </ModalContent>
          </Modal>
      </Box>
  )
}

export default Prompt