import React, { useEffect, useState, useRef } from 'react'
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
    Button, Stack, VStack
} from '@chakra-ui/react';
import { useUpload } from '../Hooks';
import LoadingModal from '../../components/LoadingModal';
import VideoRecorder from './VideoRecorder';

const VideoModal = ({ setShowVideoModal, setShowModal, open }) => {

    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
   
    
    const closeModal = () => {
        setShowVideoModal(false);
    };


    return (
        <>
            {/* <LoadingModal setShowModal={setShowModal} open={open} /> */}
            <Modal
                closeOnOverlayClick={false}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <ModalOverlay />
                <ModalContent maxW="400px" bg="white" p="3" h='auto'>
                    <Box>
                        <ModalCloseButton onClick={closeModal} />
                        <ModalBody>
                            <Box textAlign="center" mb="7">
                                <VStack spacing={3}>
                                    <Heading fontWeight={600} fontSize="23px" mb="3">
                                        Record Video
                                    </Heading>
                                    <Text fontSize={14}>
                                        Record a video you want to send to your guests
                                    </Text>
                                    <VideoRecorder />                                   
                                </VStack>
                            </Box>

                          
                        </ModalBody>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    )
}


export default VideoModal