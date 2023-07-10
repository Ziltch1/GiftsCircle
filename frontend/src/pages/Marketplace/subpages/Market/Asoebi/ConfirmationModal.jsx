import React, {useState} from 'react'
import {Modal, ModalBody, ModalCloseButton, ModalContent, Button, Heading, Text, Box, ModalOverlay, Image, Spinner, useDisclosure} from '@chakra-ui/react'

const ConfirmationModal = ({setShowModal, buyAsoebi, setOpenDrawer }) => {
  const { isOpen, onClose } = useDisclosure({defaultIsOpen: true})
  const [loading, setLoading] = useState(false)

    const HandleSubmit = async() => {
        setLoading(true)
        await buyAsoebi()
        setLoading(false)
        setOpenDrawer(false)
        setShowModal(false)
    }
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
                      <Box textAlign="center" mb="4">
                          <Heading fontWeight={600} fontSize="25px" mb="3">
                              Add Asoebi to Event!
                          </Heading>
                          <Text fontSize={14} mb='2.5'>
                              Are you sure you want to add the following asoebi to this event?
                          </Text>
                          <Text fontSize={14}>Note: You won't be able to delete them once added.</Text>
                      </Box>

                      <Box textAlign="center">
                          <Button
                              fontWeight="medium"
                              fontSize={14}
                              color="white"
                              bg="#00BFB2"
                              onClick={() => HandleSubmit()}
                          >
                              {loading ? <Spinner /> : 'Yes add asoebi'}
                          </Button>
                      </Box>
                  </ModalBody>
              </Box>
          </ModalContent>
      </Modal>
  )
}

export default ConfirmationModal