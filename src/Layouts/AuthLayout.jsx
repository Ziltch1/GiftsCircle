import { Flex, Box } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import BgImage from './assets/BgImage.svg';

const AuthLayout = () => {
  return (
    <Box
      backgroundColor="#083358"
      backgroundImage={BgImage}
      bgSize="contain"
      bgRepeat="no-repeat"
      backgroundPosition="center"
      w="100%"
      h="100vh"
    >
      <Flex justifyContent="center" h="100vh" alignItems="center">
        <Outlet />
      </Flex>
    </Box>
  );
};

export default AuthLayout;
