import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerFooter,
    useDisclosure,
    Box,
    Text,
    Heading, Flex, Image, Button
} from '@chakra-ui/react';
import GiftCard from './GiftCard';

const ComplimentaryModal = ({gift, setOpenDrawer, setOpenModal, data, setData, setAddedGiftItems, setGiftItems }) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const btnRef = React.useRef();
    const cards = [1,2,3,4,5,6,7]
    const closeModal = () => {
        setOpenDrawer(false);
    };

    return (
        <Box>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                size="lg"
                closeOnOverlayClick={false}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton onClick={closeModal} />

                    <DrawerHeader>
                        <Heading fontWeight="medium" fontSize="25px" mb="2">
                            Add complimentary Gift (optional)
                        </Heading>
                    </DrawerHeader>

                    <DrawerBody>
                        <Flex justifyContent='space-between' flexWrap='wrap'>
                        {cards.map(ele => <GiftCard />)}
                        </Flex>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button onClick={closeModal} fontSize={13} fontWeight='medium' w='150px'>Skip</Button>
                        <Button fontSize={13} color='white' ml='5' fontWeight='medium' w='150px' bg='#00BFB2'>Proceed</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default ComplimentaryModal