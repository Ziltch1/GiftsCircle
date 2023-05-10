import React, { useState } from 'react';
import { Box, Text, Heading, Flex, FormLabel, VStack } from '@chakra-ui/react';
import LoadingModal from '../../../Guest/components/LoadingModal';
import Card from '../../../Guest/components/CardItem';
import { useUpload } from '../Hooks';

const UploadedMedia = () => {
  const [image, setImage] = useState(null);
  const [modalOpen, setShowModal] = useState(false);
  const Data = useUpload(image, setShowModal, setImage);

  return (
    <Box
      w="100%"
      minH="600px"
      bg="white"
      borderRadius={10}
      boxShadow="md"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <LoadingModal setShowModal={setShowModal} open={modalOpen} />
      {Data.length > 0 ? (
        <Flex alignItems="center" gap="24px" flexWrap="wrap">
          {Data.map(ele => (
            <Card item={ele} key={Data.indexOf(ele)} />
          ))}
        </Flex>
      ) : (
        <VStack spacing={6} textAlign="center" w="450px" mx="auto">
          <Heading fontWeight="semibold" fontSize={30}>
            Media Empty
          </Heading>
          <Text fontSize={14} color="#8C8C8C">
            Your media is currently empty, share videos and images of the event
            to your guest list here
          </Text>

          <FormLabel
            htmlFor="upload"
            w="200px"
            mx="auto"
            color="white"
            bg="#00BFB2"
            fontSize={14}
            borderRadius="5px"
            px="28px"
            py="11px"
            textAlign="center"
          >
            Upload file
            <input
              type="file"
              id="upload"
              // // style={{ display: 'none' }}
              // value={image}
              multiple={true}
              onChange={e => setImage(e.target.files)}
            />
          </FormLabel>
        </VStack>
      )}
    </Box>
  );
};

export default UploadedMedia;
