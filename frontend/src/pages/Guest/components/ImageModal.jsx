import React, {useState, useEffect} from 'react'
import {
    Image, Box
} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons';


const ImageModal = ({item, setShowImageModal}) => {
  const [type, setType] = useState('IMAGE');

  useEffect(() => {
    if (item.includes('.mp4') || item.includes('.mkv') || item.includes('.webm')) {
      setType('VIDEO');
    } else if (item.includes('.mp3')) {
      setType('AUDIO');
    } else {
      setType('IMAGE');
    }
   }, [item]);

  return (
      <>
        <Box position='fixed' zIndex={1} pt='100px' left='0' top='0' w='100%' h='100%' bgColor='rgba(0,0,0,0.5)'>
            <Box position='absolute' top='15px' right='35px' color='white' fontSize={20} fontWeight='bold' onClick={() => setShowImageModal(false)}><CloseIcon /></Box>
              {type === 'IMAGE' ? (
                  <Image
                      src={item}
                      w="100%"
                      maxW='820px'
                      borderRadius={5}
                      alt=" item image"
                      display="block"
                      mx="auto"
                      objectFit="cover"
                      boxShadow="sm"
                  />
              ) : (
                  <>
                      {type === 'VIDEO' ? (
                          <video
                              controls
                              style={{ width: '100%', maxWidth: '680px', margin: 'auto', display: 'block', borderRadius: '10px', }}
                          >
                              <source src={item} type={'video/mp4' || 'video/mkv' || 'video/webm'} />
                              Sorry, your browser doesn't support videos.
                          </video>
                      ) : (
                          <audio controls style={{ width: '100%', height: '100%' }}>
                              <source src={item} type="audio/mp3" />
                              Your browser does not support the audio element.
                          </audio>
                      )}
                  </>
              )}
        </Box>
      </>
  )
}

export default ImageModal