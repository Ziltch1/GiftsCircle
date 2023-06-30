import React from 'react';
import { Box, Image, Flex } from '@chakra-ui/react';
import defaultImage from '../../../../../components/assets/default-image.svg';

const EventImages = ({ newEvent }) => {
  const image = newEvent?.image;
  const imageUrl = image;
  return (
    <>
      <Box mb="6" mt="5">
        <Flex justifyContent={'space-between'} alignItems="center">
          <Box
            bg="#EEEEEE"
            w="100%"
            h="380px"
            borderRadius={5}
            display="flex"
            alignItems={'center'}
            justifyContent="center"
            boxShadow={'md'}
          >
            {newEvent.image ? (
              <Image
                src={imageUrl}
                w="100%"
                h="100%"
                objectFit="contain"
                borderRadius={5}
              />
            ) : (
              <Image src={defaultImage} />
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default EventImages;
