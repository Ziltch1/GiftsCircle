import React, { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  Button,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import LoadingModal from '../../../components/LoadingModal';
import { useUpload } from '../Hooks';
import MediaOptionModal from './MediaOptionModal';

const MediaHeader = ({ navPosition, setNavPosition }) => {
  const [image, setImage] = useState(null);
  const [modalOpen, setShowModal] = useState(false);
  const [showMediaOption, setShowMediaOption] = useState(false);
  const [recorded, setRecorded] = useState(true);
  useUpload(image, setShowModal, setImage, recorded);

  const actionBtns = ['Uploaded by me', 'Sent to me'];

  const handleClick = index => {
    setNavPosition(index);
  };

  return (
    <Box mb="5">
      <LoadingModal setShowModal={setShowModal} open={modalOpen} />
      <MediaOptionModal
        setShowMediaOption={setShowMediaOption}
        isOpen={showMediaOption}
        setData={setImage}
      />
      <Flex justifyContent="space-between">
        <Heading mb="5" fontWeight={'medium'} fontSize={24}>
          Media
        </Heading>

        <Stack direction="row" spacing={4}>
          <Button
            onClick={() => {
              setShowMediaOption(true);
              setRecorded(true);
            }}
            w="auto"
            h="45px"
            color="white"
            bg="#00BFB2"
            fontSize={14}
            borderRadius="5px"
            px="28px"
            py="11px"
            textAlign="center"
            fontWeight="medium"
          >
            Record Media/Messages
          </Button>
          <FormLabel
            htmlFor="upload"
            w="210px"
            h="45px"
            color="white"
            bg="#00BFB2"
            fontSize={14}
            borderRadius="5px"
            px="28px"
            py="11px"
            textAlign="center"
            onClick={() => setRecorded(false)}
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
