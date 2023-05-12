import React from 'react'
import {
    Image, Box
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons';


const ImageModal = ({image, setShowImageModal}) => {
  
  return (
      <>
          <Box position='fixed' zIndex={1} pt='100px' left='0' top='0' w='100%' h='100%' bgColor='rgba(0,0,0,0.5)'>
              <Box position='absolute' top='15px' right='35px' color='white' fontSize={20} fontWeight='bold' onClick={() => setShowImageModal(false)}><CloseIcon /></Box>
              <Image src={image} borderRadius={5} display='block' margin='auto' w='100%' maxW='850px' />
          </Box>
      </>
  )
}

export default ImageModal