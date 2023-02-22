import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Image,
    Box,
    Text, Heading, Textarea
} from '@chakra-ui/react'
import gift from '../assets/gift.svg'

const GiftDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen: true})
    const btnRef = React.useRef()

    const closeModal = () => {
        
    }

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size='lg'
                closeOnOverlayClick={false}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton onClick={closeModal} />

                    <DrawerHeader mt='1'>
                        <Box w='140px' h='140px' borderRadius='50%' bg='#FAFAFA' mx='auto' display={'flex'} justifyContent='center' alignItems='center'>
                            <Image src={gift} display='block' mx='auto' />
                        </Box>
                    </DrawerHeader>

                    <DrawerBody>
                        <Box fontSize={'13px'} mb='5'>
                            <Text mb='1'>Gift Purchased</Text>
                            <Heading fontWeight={'medium'} fontSize='15px'>Iphone 12 pro max</Heading>
                        </Box>
                        <Box fontSize={'13px'} mb='5'>
                            <Text mb='1'>Date Purchased</Text>
                            <Heading fontWeight={'medium'} fontSize='15px'>June 12, 2022 9:00am</Heading>
                        </Box>
                        <Box fontSize={'13px'} mb='5'>
                            <Text mb='1'>Complimentary Gift</Text>
                            <Heading fontWeight={'medium'} fontSize='15px'>Cake Wrapper</Heading>
                        </Box>
                        <Box fontSize={'13px'} mb='5'>
                            <Text mb='1'>Purchased by</Text>
                            <Heading fontWeight={'medium'} fontSize='15px'>Abdullah Abodunrin</Heading>
                        </Box>
                        <Box fontSize={'13px'} mb='5'>
                            <Text mb='1'>Message from Guest</Text>
                            <Heading fontWeight={'medium'} fontSize='13px'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida vitae bibendum viverra purus et ullamcorper et ornare morbi. Mi vitae integer vitae cras eget consectetur ac vitae placerat. Proin magna adipiscing suscipit congue. In tristique nunc nec nibh sed.</Heading>
                        </Box>
                        <Textarea placeholder='Start typing....' size='lg' h='150px' fontSize='13px' bg='#FAFAFA' />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose} color='white' bg='#00BFB2' fontWeight='medium' fontSize='13px'>
                            Send message
                        </Button>
                    </DrawerFooter>

                </DrawerContent>
            </Drawer>
        </>
    )
}

export default GiftDrawer