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
    Box,
    Text, Heading,
} from '@chakra-ui/react'
import GiftItem from './GiftItem'


const GiftDrawer = ({setOpenDrawer}) => {

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const btnRef = React.useRef()
  const closeModal = () => {
    setOpenDrawer(false)
  }

  const lists = [1,2,3,4,5,6,7,8];
  return (
    <Box>
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

          <DrawerHeader>
            <Heading fontWeight='medium' fontSize='25px' mb='2'>Gift List (25)</Heading>
            <Text fontWeight='medium' fontSize='14px'>Find all the gifts you have added here...</Text>
          </DrawerHeader>

          <DrawerBody >
            {lists.map(() => <GiftItem />)}
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose} color='white' bg='#00BFB2' fontWeight='medium' fontSize='13px'>
              Send message
            </Button>
          </DrawerFooter> */}

        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default GiftDrawer