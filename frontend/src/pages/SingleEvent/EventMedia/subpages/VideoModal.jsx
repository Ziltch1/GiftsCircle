import React, {useEffect, useState} from 'react'
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
import {useReactMediaRecorder} from 'react-media-recorder-2'
import { FaMicrophone, FaStop, FaPause, FaTrash } from 'react-icons/fa'
import { BiSend } from 'react-icons/bi'
import { useUpload } from '../Hooks';
import LoadingModal from '../../components/LoadingModal';
import { BsCameraVideoFill } from 'react-icons/bs'


const VideoModal = ({setShowVideoModal, setShowModal, open}) => {
    const { status, startRecording, stopRecording, mediaBlobUrl, pauseRecording, clearBlobUrl } = useReactMediaRecorder({video: true});
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const [blob, setBlob] = useState(null)
    const [file, setFile] = useState(null)
    // const Data = useUpload(file, setShowModal, setFile);

    const getBlob = async() => {
        const videoBlob = await fetch(mediaBlobUrl).then((e) => e.blob())
        return videoBlob;
    }

    const blobToFile = async(blob, fileName) => {
        return await new File([blob], fileName, { lastModified: new Date().getTime(), type: blob?.type })
    }

    useEffect(() => {
        if (status === 'stopped') {
            getBlob().then((blob) => {
                setBlob(blob);
            }).then(() => {
                blobToFile(blob, 'video.mp4').then((file) => {
                    setFile(file)
                })
            })
        }
    }, [status])

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
            <ModalContent maxW="400px" bg="white" p="3">
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

                                <Text fontSize={25} textTransform='capitalize'>{status}</Text>
                                <video src={mediaBlobUrl} controls autoPlay loop />
                            </VStack>
                        </Box>

                        <Box textAlign="center">
                            <Stack spacing={3} direction='row' justifyContent='center'>
                                <Button
                                    fontWeight="medium"
                                    fontSize={14}
                                    color="white"
                                    bg="#00BFB2"
                                    onClick={clearBlobUrl}
                                >
                                    <FaTrash />
                                </Button>
                                 <Button
                                    fontWeight="medium"
                                    fontSize={16}
                                    color="white"
                                    bg="#00BFB2"
                                    onClick={pauseRecording}
                                >
                                    <FaPause />
                                </Button>
                                <Button
                                    fontWeight="medium"
                                    fontSize={16}
                                    color="white"
                                    bg="#00BFB2"
                                    onClick={startRecording}
                                >
                                    <BsCameraVideoFill />
                                </Button>
                                 <Button
                                    fontWeight="medium"
                                    fontSize={16}
                                    color="white"
                                    bg="#00BFB2"
                                    onClick={stopRecording}
                                >
                                    <FaStop />
                                </Button>
                                <Button
                                    fontWeight="medium"
                                    fontSize={16}
                                    color="white"
                                    bg="#00BFB2"
                                    // onClick={stopRecording}
                                >
                                    <BiSend />
                                </Button>
                            </Stack>
                        </Box>
                    </ModalBody>
                </Box>
            </ModalContent>
        </Modal>
        </>
    )
}


export default VideoModal