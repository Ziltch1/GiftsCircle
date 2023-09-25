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
      h='100vh'
      backgroundAttachment='fixed'
      pt='50px'
      pb={['90px', '50px']}
    >
      <Response />
      <Flex justifyContent="center" h='100%' alignItems="center">
        <Outlet />
      </Flex>
    </Box>
  );
};

export default AuthLayout;
