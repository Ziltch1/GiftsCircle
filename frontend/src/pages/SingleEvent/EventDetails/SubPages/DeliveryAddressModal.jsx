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
import errorImg from '../../../assets/errorImg.svg';

const DeliveryAddressModal = ({ setConfirmEditAddress, setEditAddress, setIsEdited }) => {
    const { onClose, isOpen } = useDisclosure({ defaultIsOpen: true });

    const editAddress = () => {
        setConfirmEditAddress(true)
        setEditAddress(false)
    }

    const confirmAddress = () => {
        setEditAddress(false)
        setIsEdited(false)
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
                    <ModalCloseButton onClick={() => setEditAddress(false)} />
                    <ModalBody>
                        <Image src={errorImg} mb="3" display="block" mx="auto" />

                        <Text mb="3.5" textAlign="center" fontSize={15}>
                            Are you sure you want to confirm this address for the delivery of your gifts?
                        </Text>


                        <Flex direction="column" w="85%" mx="auto">
                            <Button
                                mb="3"
                                bg="#00BFB2"
                                fontSize={14}
                                fontWeight="medium"
                                color="white"
                                onClick={confirmAddress}
                            >
                                Yes, confirm
                            </Button>
                            <Button
                                fontSize={14}
                                fontWeight="medium"
                                mb='3'
                                // bg={!isComplimentary ? '#00BFB2' : null}
                                // color={!isComplimentary ? 'white' : 'black'}
                                onClick={editAddress}
                            >
                                No, change it
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default DeliveryAddressModal


