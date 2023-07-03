import { Box, Image, Stack, Button, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ImageModal from './ImageModal';
import deleteIcon from '../../assets/deleteIcon.png'
import downloadIcon from '../../assets/downloadIcon.png'
import optionsIcon from '../../assets/optionsIcon.png'
import { CheckIcon } from '@chakra-ui/icons'
import { DeleteMediaApi, MediaVisibilityApi } from '../../../redux/axios/apis/media';

const Card = ({ item, images, setImages }) => {
  const [type, setType] = useState('IMAGE');
  const [showImageModal, setShowImageModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(false);
  const options = ['PRIVATE', 'PUBLIC']
  const [checkedOption, setCheckedOption] = useState(-1)
  const publicMedia = { visibility: 'PUBLIC' }
  const privateMedia = { visibility: 'PRIVATE' }

  const handleClick = (event, item) => {
    event.stopPropagation();
    downloadImage(item);
  };

  const downloadImage = async item => {
    try {
      const response = await fetch(item);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'image.jpg';
      link.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const showModal = event => {
    event.stopPropagation();
    setShowImageModal(true);
  };

  const handleDisplay = event => {
    event.stopPropagation();
    setDisplayOptions(!displayOptions);
  };

  const addCheck = async (event, index, id) => {
    event.stopPropagation();
    setCheckedOption(index);
    try {
      if (index === 0) {
        await MediaVisibilityApi(id, privateMedia);
      } else {
        await MediaVisibilityApi(id, publicMedia);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetOptions = () => {
    setDisplayOptions(false);
    setShowOptions(false);
  };

  const deleteMedia = async (event, item) => {
    event.stopPropagation();
    try {
      await DeleteMediaApi(item.id);
      setImages((prevImages) => prevImages.filter((image) => image.id !== item.id));
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    if (item.url.includes('.mp4') || item.url.includes('.mkv') || item.url.includes('.webm')) {
      setType('VIDEO');
    } else if (item.url.includes('.mp3') || item.url.includes('.webm')) {
      setType('AUDIO');
    } else {
      setType('IMAGE');
    }
  }, [item]);

  return (
    <>
      {showImageModal && (
        <ImageModal item={item.url} setShowImageModal={setShowImageModal} />
      )}
      <Box
        w="282px"
        h="282px"
        bg="white"
        borderRadius={5}
        boxShadow="md"
        cursor="pointer"
        onClick={showModal}
        position="relative"
        onMouseOver={() => setShowOptions(true)}
        onMouseLeave={resetOptions}
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
            opacity={showOptions ? '0.9' : '1'}
            transition="ease 0.1s"
          />
        ) : (
          <>
            {type === 'VIDEO' ? (
              <video
                controls
                style={{ width: '100%', height: '100%', borderRadius: '5px', objectFit: 'cover' }}
              >
                <source src={item.url} type={'video/mp4' || 'video/mkv' || 'video/webm'} />
                Sorry, your browser doesn't support videos.
              </video>
            ) : (
              <>
                {type === 'AUDIO' && (
                  <audio controls style={{ width: '100%', height: '100%' }}>
                    <source src={item.url} type={'audio/mp3' || 'audioo/mkv' || 'audio/webm'} />
                    Your browser does not support the audio element.
                  </audio>)
                }
              </>
            )}
          </>
        )}

        <Box w='auto' textAlign='center' position='absolute' margin='45% auto' inset='0' opacity={showOptions ? '1' : '0'} transition='ease 0.1s'>
          <Stack direction='row' alignItems='flex-start' justifyContent='center'>
            <Button bg='none' _hover={{ bg: 'none', cursor: 'pointer' }} onClick={(event) => deleteMedia(event, item)}><Image src={deleteIcon} w='100%' /></Button>
            <Button bg='none' _hover={{ bg: 'none', cursor: 'pointer' }} onClick={(event) => handleClick(event, item.url)}><Image src={downloadIcon} /></Button>
            <Button bg='none' _hover={{ bg: 'none', cursor: 'pointer' }} onClick={handleDisplay}>
              <Stack direction='column' spacing={3} position='relative'>
                <Box><Image src={optionsIcon} /></Box>
                {displayOptions &&
                  <Box w='300px' fontSize={15} bg='white' borderRadius={5} p='3' textAlign='left' position='absolute' top='36px' right='0' boxShadow='sm' border='1.5px solid lightgray'>
                    {options.map((option, index) => {
                      return (
                        <>
                          <Stack direction='row' justifyContent='space-between' alignItems='center' onClick={(event) => addCheck(event, index, item.id)}>
                            <Text py='2.5'>{option}</Text>
                            {checkedOption === index ? <CheckIcon color='#00BFB2' fontSize={18} /> : null}
                          </Stack>
                        </>
                      );
                    })}
                  </Box>
                }
              </Stack>
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Card;
