import { Flex, Box, Circle } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import BgImage from './assets/BgImage.svg';

const AuthLayout = () => {
  return (
    <Box
      background="#083358"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      backgroundImage={BgImage}
      bgSize="cover"
      bgRepeat="no-repeat"
      backgroundPosition="center"
      w="100%"
    >
      <Box position="absolute" top="0" left="0">
        <Box>
          <Circle
            size="100vh"
            background="#FF9F1C"
            filter="blur(300px)"
            opacity="0.3"
          />
          {/* <Circle
            position="absolute"
            top="0"
            left="0"
            size="1136px"
            background="#009F94"
            filter="blur(300px)"
            opacity="0.3"
          /> */}
        </Box>
      </Box>

      <Flex justifyContent="center" h="100vh" alignItems="center">
        <Outlet />
      </Flex>
    </Box>
  );
};

export default AuthLayout;
