import React from 'react'
import { Modal, ModalBody, ModalContent, ModalCloseButton, Button, Text, Heading, ModalOverlay, useDisclosure, Box } from '@chakra-ui/react'

const RequestModal = ({setShowModal}) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  return (
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
                      {/* <Image src={errorImg} display="block" mx="auto" mb="3" /> */}
                      <Box textAlign="center" mb="5">
                          <Heading fontWeight={600} fontSize="25px" mb="3">
                              Request for an item?
                          </Heading>
                          <Text fontSize={14} mb='4' lineHeight={8}>
                              You want a gift item that is not on the list? Request for it by contacting the number below.
                          </Text>
                          <Text fontSize={18} fontWeight='semibold'>+234 776 6575 757</Text>
                      </Box>

                      <Box textAlign="center">
                          <Button
                              fontWeight="medium"
                              fontSize={14}
                              color="white"
                              bg="#00BFB2"
                              onClick={() => setShowModal(false)}
                          >
                              Close
                          </Button>
                      </Box>
                  </ModalBody>
              </Box>
          </ModalContent>
      </Modal>
  )
}

export default RequestModal