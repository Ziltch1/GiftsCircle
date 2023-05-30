import { Box, Image, Stack, Button, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ImageModal from './ImageModal';
import deleteIcon from '../../assets/deleteIcon.png'
import downloadIcon from '../../assets/downloadIcon.png'
import optionsIcon from '../../assets/optionsIcon.png'
import { CheckIcon } from '@chakra-ui/icons'

const Card = ({ item }) => {
  const [type, setType] = useState('IMAGE');
  const [showImageModal, setShowImageModal] = useState(false)
  const [showOptions, setShowOptions] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(false);
  const options = ['Seen by host only', 'Seen by host and public']
  const [checkedOption, setCheckedOption] = useState(-1)

  const handleClick = (event, item) => {
    event.stopPropagation();
    downloadImage(item);
  }

  const downloadImage = async (item) => {
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


  const showModal = (event) => {
    event.stopPropagation();
    setShowImageModal(true);
  }


  const handleDisplay = (event) => {
    event.stopPropagation();
    setDisplayOptions(!displayOptions)
  }

  const addCheck = (event, index) => {
    event.stopPropagation();
    setCheckedOption(index);
  }

  const resetOptions = () => {
    setDisplayOptions(false);
    setShowOptions(false);
  }

  const deleteMedia = (event) => {
    event.stopPropagation();
    console.log('delete media')
  }


  useEffect(() => {
    if (item.includes('.mp4')) {
      setType('VIDEO');
    } else {
      setType('IMAGE');
    }
  }, [item]);

  return (
    <>
      {showImageModal && (
        <ImageModal image={item} setShowImageModal={setShowImageModal} />
      )}
      <Box
        w="282px"
        h="282px"
        bg="white"
        borderRadius={5}
        boxShadow="md"
        cursor="pointer"
        onClick={showModal}
        position='relative'
        onMouseOver={() => setShowOptions(true)}
        onMouseLeave={resetOptions}
      >
        {type === 'IMAGE' ? (
          <Image
            src={item}
            w="100%"
            h="100%"
            borderRadius={5}
            alt="item item image"
            display="block"
            mx="auto"
            objectFit="cover"
            boxShadow="sm"
            opacity={showOptions ? '0.9' : '1'}
            transition='ease 0.1s'
          />
        ) : (
          <>
            {type === 'VIDEO' ? (
              <video
                controls
                width="100%"
                height="330px"
                poster={item.replace('.mp4', '.jpg')}
              >
                <source src={item} type="video/mp4" />
                Sorry, your browser doesn't support videos.
              </video>
            ) : (
              <audio controls>
                <source src={item} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            )}
          </>
        )}

        <Box w='auto' textAlign='center' position='absolute' margin='45% auto' inset='0' opacity={showOptions ? '1' : '0'} transition='ease 0.1s'>
          <Stack direction='row' alignItems='flex-start' justifyContent='center'>
            <Button bg='none' _hover={{ bg: 'none', cursor: 'pointer' }} onClick={deleteMedia}><Image src={deleteIcon} w='100%' /></Button>
            <Button bg='none' _hover={{ bg: 'none', cursor: 'pointer' }} onClick={(event) => handleClick(event, item)}><Image src={downloadIcon} /></Button>
            <Button bg='none' _hover={{ bg: 'none', cursor: 'pointer' }} onClick={handleDisplay}>
              <Stack direction='column' spacing={3} position='relative'>
                <Box><Image src={optionsIcon} /></Box>
                {displayOptions &&
                  <Box w='300px' fontSize={15} bg='white' borderRadius={5} p='3' textAlign='left' position='absolute' top='36px' right='0' boxShadow='sm' border='1.5px solid lightgray'>
                    {options.map((option, index) => {
                      return (
                        <>
                          <Stack direction='row' justifyContent='space-between' alignItems='center' onClick={(event) => addCheck(event, index)}>
                            <Text py='2.5'>{option}</Text>
                            {checkedOption === index ? <CheckIcon color='#00BFB2' fontSize={18} /> : null}
                          </Stack>
                        </>
                      )
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
