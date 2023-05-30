import React, { useState } from 'react';
import { Box, Heading, Flex, Button, FormLabel, Input, Stack } from '@chakra-ui/react';
import LoadingModal from '../../components/LoadingModal';
import { useUpload } from '../Hooks';
import VideoModal from './VideoModal';

const MediaHeader = ({ navPosition, setNavPosition }) => {
  const [image, setImage] = useState(null);
  const [modalOpen, setShowModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const Data = useUpload(image, setShowModal, setImage);
  
  const actionBtns = ['Uploaded by me', 'Sent to me'];
  const handleClick = index => {
    setNavPosition(index);
  };

  const startVideo = () => {
    setShowVideoModal(true);
  }

  return (
    <Box mb="5">
      <LoadingModal setShowModal={setShowModal} open={modalOpen} />
      {showVideoModal && <VideoModal setShowVideoModal={setShowVideoModal} open={modalOpen} setShowModal={setShowModal} />}
      <Flex justifyContent="space-between">
        <Heading mb="5" fontWeight={'medium'} fontSize={24}>
          Media
        </Heading>

        <Stack direction='row' spacing={3}>
          <Button
            onClick={startVideo}
            w="150px"
            h='45px'
            color="white"
            bg="#00BFB2"
            fontSize={14}
            borderRadius="5px"
            px="28px"
            py="11px"
            textAlign="center"
            fontWeight='medium'
          >
            Record video
          </Button>
          <FormLabel
            htmlFor="upload"
            w="210px"
            h='45px'
            color="white"
            bg="#00BFB2"
            fontSize={14}
            borderRadius="5px"
            px="28px"
            py="11px"
            textAlign="center"
          >
            Upload images/videos
            <Input
              type="file"
              id="upload"
              display="none"
              multiple={true}
              onChange={e => setImage(e.target.files)}
            />
          </FormLabel>
        </Stack>
      </Flex>
      <Box fontSize={14} fontWeight="semibold">
        <Flex alignItems={'center'} gap={4}>
          {actionBtns.map((btn, index) => (
            <Button
              borderRadius={100}
              fontSize={14}
              bg="none"
              onClick={() => handleClick(index)}
              style={
                index === navPosition
                  ? {
                      background: '#CCF2F0',
                      padding: '8px 15px',
                      borderRadius: '100px',
                      color: '#009F94',
                    }
                  : { fontWeight: 'bold' }
              }
            >
              {btn}
            </Button>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default MediaHeader;
