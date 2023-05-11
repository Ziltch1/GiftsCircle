import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Image, Box
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons';


const ImageModal = ({image, setShowImageModal}) => {
  const { onClose, isOpen, onOpen } = useDisclosure({ defaultIsOpen: true });
  return (
      <>
          <Box position='fixed' zIndex={1} pt='100px' left='0' top='0' w='100%' h='100%' bgColor='rgba(0,0,0,0.5)'>
              <Box position='absolute' top='15px' right='35px' color='white' fontSize={20} fontWeight='bold' onClick={() => setShowImageModal(false)}><CloseIcon /></Box>
              <Image src={image} display='block' margin='auto' w='100%' maxW='700px' />
          </Box>
      </>
  )
}

export default ImageModal