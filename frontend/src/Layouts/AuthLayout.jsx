import { Flex, Box } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Background from './assets/Background.jpg';
import Response from '../components/ResponseToast'

const AuthLayout = () => {
  return (
    <Box
      backgroundImage={Background}
      bgSize="cover"
      bgRepeat="no-repeat"
      backgroundPosition="center"
      w="100%"
    >
      <Response />
      <Flex justifyContent="center" h="100vh" alignItems="center">
        <Outlet />
      </Flex>
    </Box>
  );
};

export default AuthLayout;
