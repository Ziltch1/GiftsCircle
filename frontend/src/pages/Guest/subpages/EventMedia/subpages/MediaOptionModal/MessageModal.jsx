import React, { useState, useEffect } from 'react'
import {
    Box,
    Heading,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Text,
    Image,
    useDisclosure,
    Button, Stack, VStack, ModalFooter
} from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MessageModal = ({ setShowAudioModal, setNavPosition }) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const [message, setMessage]  = useState('')

    //modules for react quill editor
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            ['blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
            ['link', 'image', 'video'],
        ],
    };

    const closeModal = () => {
        setNavPosition(-1)
        // setShowAudioModal(false);
    };

    return (
        <Modal
            closeOnOverlayClick={false}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
        >
            <ModalOverlay />
            <ModalContent maxW="450px" h='480px' bg="white" p="3">
                <Box>
                    <ModalCloseButton onClick={closeModal} />
                    <ModalBody>
                        <Box textAlign="center" mb="7">
                            <VStack spacing={3}>
                                <Heading fontWeight={600} fontSize="23px" mb="3">
                                    Send a message to your host
                                </Heading>
                            </VStack>
                        </Box>

                        <Box textAlign="center">
                            <ReactQuill
                                theme="snow"
                                dangerouslySetInnerHTML={{ __html: message }}
                                onChange={setMessage}
                                value={message}
                                modules={modules}
                                style={{ height: '240px', borderRadius: '12px' }}
                            />
                        </Box>
                    </ModalBody>
                </Box>
                <ModalFooter>
                    <Button fontWeight="medium"
                        fontSize={16}
                        color="white"
                        bg="#00BFB2">Send</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default MessageModal