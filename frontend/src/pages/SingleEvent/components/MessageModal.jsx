import {
    Modal,
    Box,
    ModalBody,
    ModalCloseButton,
    Heading,
    Text,
    ModalContent,
    ModalOverlay,
    useDisclosure,Flex
} from '@chakra-ui/react';
import React from 'react';

const MessageModal = ({ setShowModal, message }) => {
    const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen: true});
    return (
        <>
            <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen} onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent maxW="420px" h='350px' overflow='auto' bg="white" py="8" px="6">
                    <Box>
                        <ModalCloseButton onClick={() => setShowModal(false)} />
                        <ModalBody>
                            <Box textAlign="center" mb="4">
                                <Heading fontWeight={600} fontSize="25px" mb="3">
                                    Media Message
                                </Heading>
                                <Flex mb='2' gap={2}>
                                    <Text mb="2" fontWeight='bold'>Date Sent:</Text>
                                    <Text>{new Date(message?.date).toDateString()}</Text>
                                </Flex>
                                <Flex mb='2' gap={2}>
                                    <Text fontWeight='bold'>Sent By: </Text>
                                    <Text mb="2">{`${message.user.firstname} ${message.user.lastname}`}</Text>
                                </Flex>
                                <Box textAlign='left'>
                                    <Text mb='2' fontWeight='bold'>Message:</Text>
                                    <Box dangerouslySetInnerHTML={{ __html: message?.message }}></Box>
                                </Box>
                            </Box>
                        </ModalBody>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    );
};

export default MessageModal;
