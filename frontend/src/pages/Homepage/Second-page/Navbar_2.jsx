import React from 'react';
import { Box, Image, Flex, Button } from '@chakra-ui/react';
import logo from '../../../components/assets/event-circle1.svg';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar_2 = () => {
  const {token} = useSelector(state => state.auth);
  return (
    <Box p="3" boxShadow={'sm'}>
      <Flex
        w="90%"
        mx="auto"
        justifyContent="space-between"
        alignItems={'center'}
      >
        <Box>
          <Image src={logo} />
        </Box>

        {!token ? 
          <Box>
            <Button bg="none" color="#0C4C84">
              {' '}
              <AddIcon mr="1.5" />
              Create an event{' '}
            </Button>
            <Button bg="none" _hover={{ bg: 'none' }}>
              <Link to="/signin">Sign in</Link>
            </Button>
            <Button
              bg={'#00BFB2'}
              color="white"
              px="20px"
              py="10px"
              w="120px"
              h="42px"
              boxShadow={'md'}
              _hover={{ bg: '#00BFB2' }}
            >
              <Link to="/signup">Sign up</Link>
            </Button>
          </Box>
          :
          <Button
            bg={'#00BFB2'}
            color="white"
            px="20px"
            py="10px"
            w="120px"
            h="42px"
            boxShadow={'md'}
            _hover={{ bg: '#00BFB2' }}
          >
            <Link to="/dashboard">Dashboard</Link>
          </Button>
        }
      </Flex>
    </Box>
  );
};

export default Navbar_2;
