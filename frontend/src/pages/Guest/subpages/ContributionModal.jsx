import React, { useState } from 'react'
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
    useDisclosure, Flex, FormLabel, Input
} from '@chakra-ui/react';
import errorImg from '../../assets/errorImg.svg'

const ContributionModal = ({setOpenModal, event}) => {
  const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen: true });
  const [contribution, setContribution] = useState(false)
  console.log(event);
  return (
    <Box>
        {contribution && <ContributionAmount setContribution={setContribution} setOpenModal={setOpenModal} />}
        <Modal 
            isCentered  
            closeOnOverlayClick={false}
            onClose={onClose}
            isOpen={isOpen}
            
        >
            <ModalOverlay />
            <ModalContent py='4' w='380px' h='auto'> 
                  <ModalCloseButton onClick={() => setOpenModal(false)} />
                  <ModalBody>
                      <Image src={errorImg} mb='3' display='block' mx='auto' />
                      <Text mb='3' textAlign='center'>If contribution is enabled for this product, you can contribute to pay part of the total cost or you can pay in full</Text>
                      <Flex direction='column' w='85%' mx='auto'>
                          <Button mb='3' bg='#00BFB2' fontSize={14} fontWeight='medium' color='white'>Pay in full </Button>
                          {event.applyDonation && (<Button fontSize={14} fontWeight='medium' onClick={() => setContribution(true)}>Contribute</Button>)}
                      </Flex>
                  </ModalBody>
            </ModalContent>
        </Modal>
    </Box>
  )
}

export default ContributionModal

export const ContributionAmount = ({setContribution, setOpenModal}) => {
    const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const closeModal = () => {
        // setOpenModal(false)
        setContribution(false);
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
                <ModalContent py='4' w='380px' h='auto'>
                    <ModalCloseButton onClick={closeModal} />
                    <ModalBody>
                        <Heading mb='5' fontWeight='semibold' fontSize={24} textAlign='center'>How much do you want to contribute?</Heading>
                        <Flex w='70%' mx='auto' justifyContent='space-between' mb='5'>
                            <Button bg='#CCF2F0' fontSize={13} fontWeight='medium' color='#00BFB2' borderRadius='100px'>1,000</Button>
                            <Button bg='#CCF2F0' fontSize={13} fontWeight='medium' color='#00BFB2' borderRadius='100px'>5,000</Button>
                            <Button bg='#CCF2F0' fontSize={13} fontWeight='medium' color='#00BFB2' borderRadius='100px'>10,000</Button>
                        </Flex>
                        <Box mb='5'>
                            <FormLabel fontSize={14}>Type amount here</FormLabel>
                            <Input type='text' placeholder='Amount' fontSize={14} />
                        </Box>
                        <Box textAlign='center'>
                            <Button mb='3' w='100%' bg='#00BFB2' fontSize={14} fontWeight='medium' color='white'>Proceed</Button>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}