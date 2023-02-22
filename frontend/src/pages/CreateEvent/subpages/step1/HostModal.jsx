import React from 'react'
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
    ModalFooter,
    ModalHeader, 
    Input,
    Flex,
    Avatar, AvatarBadge
} from '@chakra-ui/react';

const HostModal = ({setOpenModal}) => {
    const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen: true})
    const closeModal = () => {
        setOpenModal(false);
    }

  return (
      <Box>
          <Modal closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered>
              <ModalOverlay />
              <ModalContent maxW='500px' bg='white' pb='4'>
                  <Box>
                      <ModalHeader fontSize={14}>Add multiple hosts to your event</ModalHeader>
                      <ModalCloseButton onClick={closeModal} />
                      <ModalBody>
                          <Flex justifyContent='space-between' mb='4'>
                              <Input type='email' w='75%' placeholder='Enter email' fontSize={13} />
                              <Button w='23%' fontSize={12} px='7' bg='#CCF2F0' color='#009F94'>Send invite</Button>
                          </Flex>

                          <Box mb='5' fontSize={14}>
                            <Box mb='3'>
                                <Flex alignItems='center' justifyContent='space-between'>
                                    <Box>
                                        <Flex gap={3} alignItems='center'>
                                              <Avatar name='Abdullah Abodunrin' size='sm' color='white' bg='#FF9F1C' />
                                              <Text>Abdullah Abodunrin</Text>
                                        </Flex>
                                    </Box>
                                    <Box><Text fontWeight='semibold'>Invite sent</Text></Box>
                                </Flex>
                            </Box>
                            <Box mb='3'>
                                <Flex alignItems='center' justifyContent='space-between'>
                                    <Box>
                                        <Flex gap={3} alignItems='center'>
                                              <Avatar name='Abdullah Abodunrin' size='sm' color='white' />
                                              <Text>Abdullah Abodunrin</Text>
                                        </Flex>
                                    </Box>
                                    <Box><Text fontWeight='semibold' color='#00BFB2'>Joined</Text></Box>
                                </Flex>
                            </Box>
                            <Box mb='3'>
                                <Flex alignItems='center' justifyContent='space-between'>
                                    <Box>
                                        <Flex gap={3} alignItems='center'>
                                              <Avatar name='Abdullah Abodunrin' size='sm' color='white' bg='#0C4C84' />
                                              <Text>Abdullah Abodunrin</Text>
                                        </Flex>
                                    </Box>
                                    <Box><Text fontWeight='semibold' color='#00BFB2'>Joined</Text></Box>
                                </Flex>
                            </Box>
                            <Box mb='3'>
                                <Flex alignItems='center' justifyContent='space-between'>
                                    <Box>
                                        <Flex gap={3} alignItems='center'>
                                              <Avatar name='Abdullah Abodunrin' size='sm' color='white' />
                                              <Text>Abdullah Abodunrin</Text>
                                        </Flex>
                                    </Box>
                                    <Box><Text fontWeight='semibold'>Invite sent</Text></Box>
                                </Flex>
                            </Box>
                          </Box>

                          <Text fontSize={14} color='#0C4C84'>Copy link to share with other hosts</Text>
                      </ModalBody>
                  </Box>
              </ModalContent>
          </Modal>
      </Box>
  )
}

export default HostModal