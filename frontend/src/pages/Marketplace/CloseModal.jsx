import { Modal, Box, Button, ModalBody, ModalCloseButton, Image, Heading, Text, ModalContent, ModalOverlay, useDisclosure} from '@chakra-ui/react'
import React from 'react'
import errorImg from '../assets/errorImg.svg'

const CloseModal = ({setShowModal}) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const HandleSubmit = () => {

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
                  Remove from Cart!
                </Heading>
                <Text fontSize={14}>
                  Do you really want to remove this item from cart?
                </Text>
              </Box>

              <Box textAlign="center">
                
                  <Button
                    fontWeight="medium"
                    fontSize={14}
                    color="white"
                    bg="#00BFB2"
                    onClick={() => HandleSubmit()}
                  >
                  Remove from cart
                  </Button>
                
              </Box>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CloseModal