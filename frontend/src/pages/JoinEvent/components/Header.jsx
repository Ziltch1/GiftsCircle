import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/event-circle.svg';

const Header = () => {
  return (
    <Box bg="#CEDBE6" p="3" w="100%">
      <Box w="90%" mx="auto">
        <Flex justifyContent='space-between'>
          <Box>
            <Link to="/">
              <Image src={logo} w="100%" />
            </Link>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
