import React from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/event-circle.svg';
import Warning from '../assets/warning.svg';

const PasswordMail = () => {
  const email = localStorage.getItem('forgotUser');
  return (
    <Flex
      bgColor="#fff"
      color="#000000"
      h="433px"
      w={['350px', '559px']}
      direction="column"
      gap="30px"
      zIndex="99"
    >
      <Box bgColor="#0F172A" h="104.25px" p="30px 60px">
        <Flex justifyContent="center">
          <Box>
            <img src={Logo} alt="logo" />
          </Box>
        </Flex>
      </Box>

      <Box px={[5, '50px']}>
        <Flex direction="column" gap="20px">
          <Flex direction="column" gap="10px" width="373px">
            <Text
              fontSize={['25px', '30px']}
              color="#000000"
              letterSpacing="-0.02em"
              lineHeight="40px"
              fontWeight="500"
            >
              Check your inbox
            </Text>

            <Text
              fontSize="14px"
              color="#383838"
              lineHeight="22px"
              fontWeight="500"
            >
              A link was sent to{' '}
              <Link style={{ color: '#0C4C84' }}>{email} </Link>to <br /> reset
              your password.
            </Text>
          </Flex>

          <Button
            boxShadow="0px 8px 30px rgba(0, 191, 178, 0.1)"
            bgColor="#00BFB2"
            borderRadius="5px"
            gap="10px"
            h="50px"
            p="14px 28px"
            fontSize="14px"
            color="#FFFFFF"
            lineHeight="22px"
            fontWeight="500"
            _hover={{ bgColor: '55D4CC' }}
          >
            <Link to="/signin">Go back to login </Link>
            <HiOutlineArrowNarrowRight />
          </Button>

          <Flex
            p="10px"
            gap="10px"
            bg="#EEEEEE"
            alignItems="flex-start"
            borderRadius="5px"
          >
            <img src={Warning} alt="warning" />
            <Text
              fontSize="14px"
              color="#000000"
              lineHeight="22px"
              fontWeight="500"
            >
              If you don’t see our email in your inbox, please check your <br />{' '}
              spam folder
            </Text>
          </Flex>

      
        </Flex>
      </Box>
    </Flex>
  );
};

export default PasswordMail;
