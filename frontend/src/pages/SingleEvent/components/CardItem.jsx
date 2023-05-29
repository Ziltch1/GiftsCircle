import { Box, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ImageModal from './ImageModal';

const Card = ({ item }) => {
  const [type, setType] = useState('IMAGE');
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    if (item.url.includes('.mp4')) {
      setType('VIDEO');
    } else {
      setType('IMAGE');
    }
  }, [item]);

  return (
    <>
      {showImageModal && (
        <ImageModal image={item.url} setShowImageModal={setShowImageModal} />
      )}
      <Box
        w="282px"
        h="282px"
        bg="white"
        borderRadius={5}
        boxShadow="md"
        cursor="pointer"
        onClick={() => setShowImageModal(true)}
        // border='1px solid #C6C6C6'
      >
        {type === 'IMAGE' ? (
          <Image
            src={item.url}
            w="100%"
            h="100%"
            borderRadius={5}
            alt="item item image"
            display="block"
            mx="auto"
            objectFit="cover"
            boxShadow="sm"
          />
        ) : (
          <video
            controls
            width="100%"
            height="330px"
            poster={item.url.replace('.mp4', '.jpg')}
          >
            <source src={item.url} type="video/mp4" />
            Sorry, your browser doesn't support videos.
          </video>
        )}
      </Box>
    </>
  );
};

export default Card;
