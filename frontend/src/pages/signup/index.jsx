import React from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.png';
import Google from './assets/google.svg';
import Apple from './assets/apple.svg';
import {
  signInWithPopup,
  auth,
  provider,
} from '../../redux/axios/Utils/Firebase';
import { CreateUserApi } from '../../redux/axios/apis/user';

const SignUp = () => {
  const navigate = useNavigate();

  const GoogleSignUp = () => {
    signInWithPopup(auth, provider)
      .then(async result => {
        const formBody = {
          firstname: result.user.displayName?.split(' ')[1],
          lastname: result.user.displayName?.split(' ')[0],
          email: result.user.email,
        };

        const res = await CreateUserApi(formBody);
        if (res.status) {
          localStorage.setItem('newUser', result.user.email);
          navigate('/signup_verify_otp');
        }
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  };

  return (
    <Flex
      bgColor="#fff"
      color="#000000"
      h="575px"
      w="559px"
      direction="column"
      zIndex="99"
    >
      <Box bgColor="#0F172A" h="104.25px" p="30px 40px">
        <Flex justifyContent="center">
          <Box>
            <img src={Logo} alt="logo" />
          </Box>
        </Flex>
      </Box>

      <Box p="40px" borderRadius="0px 0px 10px 10px">
        <Flex direction="column" gap="20px">
          <Flex direction="column" gap="10px" width="373px">
            <Text
              fontSize="30px"
              color="#000000"
              letterSpacing="-0.02em"
              lineHeight="40px"
              fontWeight="500"
            >
              Welcome to Gift Circle!
            </Text>

            <Text
              fontSize="14px"
              color="#383838"
              lineHeight="22px"
              fontWeight="500"
            >
              Let's get you logged in to get back to adding gift list to your
              event page.
            </Text>
          </Flex>
          <Flex direction="column" gap="20px">
            <Button
              bgColor="#00BFB2"
              boxShadow="0px 8px 30px rgba(0, 191, 178, 0.1)"
              borderRadius="5px"
              gap="10px"
              h="50px"
              p="14px 28px"
              fontSize="14px"
              color="#FFFFFF"
              lineHeight="22px"
              fontWeight="500"
              _hover={{ bgColor: '#00BFB2' }}
              onClick={() => navigate('/signup_with_email')}
            >
              Sign up with email
            </Button>

            <Flex justifyContent="center" alignItems="center" gap="10px">
              <HiOutlineArrowNarrowLeft />
              <Text
                color="#000000"
                fontSize="14px"
                lineHeight="22px"
                fontWeight="500"
              >
                or continue with
              </Text>
              <HiOutlineArrowNarrowRight />
            </Flex>

            <Flex
              border="1px solid #C6C6C6"
              bgColor="#FFFFFF"
              borderRadius="5px"
              gap="10px"
              h="50px"
              p="13px 198px"
              _hover={{ bgColor: '#ffffff' }}
              cursor="pointer"
              onClick={() => GoogleSignUp()}
            >
              <img src={Google} alt="google" />
              <Text
                fontSize="14px"
                color="#000000"
                lineHeight="22px"
                fontWeight="500"
              >
                Google
              </Text>
            </Flex>

            <Flex
              border="1px solid #C6C6C6"
              bgColor="#FFFFFF"
              borderRadius="5px"
              gap="10px"
              h="50px"
              justifyContent="center"
              alignItems="center"
              _hover={{ bgColor: '#ffffff' }}
              cursor="pointer"
            >
              <img src={Apple} alt="google" />
              <Text
                fontSize="14px"
                color="#000000"
                lineHeight="22px"
                fontWeight="500"
              >
                Apple ID
              </Text>
            </Flex>
            <Flex justifyContent="center" alignItems="center" gap="10px">
              <Text
                color="#383838"
                fontSize="14px"
                lineHeight="22px"
                fontWeight="500"
              >
                Don’t have an account?{' '}
                <Link to="/signin" style={{ color: '#0C4C84' }}>
                  Login here
                </Link>
              </Text>
              <HiOutlineArrowNarrowRight />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SignUp;
