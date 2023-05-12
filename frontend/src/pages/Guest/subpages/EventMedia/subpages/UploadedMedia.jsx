import React, { useState } from 'react';
import { Box, Text, Heading, Flex, FormLabel, VStack, Input } from '@chakra-ui/react';
import { useUpload } from '../Hooks';
import LoadingModal from '../../../components/LoadingModal';
import Card from '../../../components/CardItem';

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
      py='5'
      px='8'
      overflowY='auto'
    // display="flex"
    // justifyContent={Data.length > 0 ? 'space-between' : 'center'}
    // alignItems="center"
    >

      <LoadingModal setShowModal={setShowModal} open={modalOpen} />
      {Data.length > 0 ? (
        <>
          <Box w='100%' h='1px' bgColor='#C6C6C6' mt='5' mb='8' textAlign='center' position='relative'>
            <Box color='#8C8C8C' fontSize={14} w='150px' bgColor='white' position='absolute' top={-3} left='42%'>January 12th, 2022</Box>
          </Box>
          <Flex alignItems="center" gap="28px" justifyContent='center' flexWrap="wrap">
            {Data.map(ele => (
              <Card item={ele} key={Data.indexOf(ele)} />
            ))}
          </Flex>
        </>
      ) : (
        
        <VStack spacing={6} textAlign="center" w="450px" mx="auto" mt='20%'>
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
            <Input
              type="file"
              id="upload"
              display='none'
              value={image}
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
