import React from 'react';
import {
    Text,
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
} from '@chakra-ui/react';
import errorImg from '../../assets/errorImg.svg';
import { Link } from 'react-router-dom';

const JoinEventModal = ({ setShowJoinEventModal, setGuest, setCoHost }) => {
    const { onClose, isOpen } = useDisclosure({ defaultIsOpen: true });

    const guestJoin = (index) => {
        setGuest(true)
        setShowJoinEventModal(false);
    }

    const coHostJoin = () => {
        setCoHost(true)
        setShowJoinEventModal(false);
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
                    <Link to='/dashboard'><ModalCloseButton /></Link>
                    <ModalBody>
                        <Image src={errorImg} mb="3" display="block" mx="auto" />

                        <Text mb="3.5" textAlign="center">
                            How do you want to Join this event?
                        </Text>


                        <Flex direction="column" w="85%" mx="auto">
                            <Button
                                mb="3"
                                bg="#00BFB2"
                                fontSize={14}
                                fontWeight="medium"
                                color="white"
                                onClick={guestJoin}
                            >
                                Join as a guest
                            </Button>
                            <Button
                                fontSize={14}
                                fontWeight="medium"
                                mb='3'
                                // bg={!isComplimentary ? '#00BFB2' : null}
                                // color={!isComplimentary ? 'white' : 'black'}
                                onClick={coHostJoin}
                            >
                                Join as a Co-host
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default JoinEventModal