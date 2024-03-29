import React from 'react';
import {
  Box,
  Flex,
  Text,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/Logo.png';

const SignWithEmail = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [emailTest, setEmailTest] = useState(false);
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const EmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (EmailRegex.test(email)) {
      setEmailTest(true);
    } else {
      setEmailTest(false);
    }
  }, [email]);
  return (
    <Flex
      bgColor="#fff"
      color="#000000"
      h="685px"
      w="559px"
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

      <Box m="0px 60px">
        <Flex direction="column" gap="20px">
          <Flex direction="column" gap="10px" width="373px">
            <Text
              fontSize="30px"
              color="#000000"
              letterSpacing="-0.02em"
              lineHeight="40px"
              fontWeight="500"
            >
              Sign up
            </Text>

            <Text
              fontSize="14px"
              color="#383838"
              lineHeight="22px"
              fontWeight="500"
            >
              Start adding gifts to your events and let people <br /> purchase
              it for you
            </Text>
          </Flex>
          <Flex direction="column" gap="20px">
            <FormControl gap="6px">
              <FormLabel
                fontSize="14px"
                color="#12141D"
                lineHeight="22px"
                fontWeight="500"
              >
                Enter email address
              </FormLabel>
              <Input
                borderRadius="10px"
                bgColor={
                  email === ''
                    ? '#F4F4F4'
                    : emailTest
                    ? '#F4F4F4'
                    : 'rgba(255, 77, 79, 0.1)'
                }
                border={
                  email === ''
                    ? 'none'
                    : emailTest
                    ? '1px solid #389E0D'
                    : '1px solid #FF4D4F'
                }
                h="46px"
                p="12px"
                gap="10px"
                type="email"
                name="email"
                fontSize="14px"
                lineHeight="22px"
                fontWeight="400"
                color="#A8A8A8"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="e.g dayo.abdullahi@gmail.com"
                _placeholder={{
                  color: '#A8A8A8',
                  opacity: 0.4,
                  fontSize: '14px',
                }}
              />
              {email !== '' && !emailTest && (
                <FormHelperText
                  fontSize="14px"
                  lineHeight="22px"
                  fontWeight="500"
                  color="#FF4D4F"
                >
                  Not a valid Email
                </FormHelperText>
              )}
            </FormControl>

            <FormControl gap="6px">
              <FormLabel
                fontSize="14px"
                color="#12141D"
                lineHeight="22px"
                fontWeight="500"
              >
                Enter firstname
              </FormLabel>
              <Input
                bgColor="#F4F4F4"
                borderRadius="10px"
                h="46px"
                gap="10px"
                type="text"
                name="firstname"
                fontSize="14px"
                p="12px"
                lineHeight="22px"
                fontWeight="400"
                placeholder="dayo"
                _placeholder={{
                  color: '#A8A8A8',
                  opacity: 0.4,
                  fontSize: '14px',
                }}
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </FormControl>

            <FormControl gap="6px">
              <FormLabel
                fontSize="14px"
                color="#12141D"
                lineHeight="22px"
                fontWeight="500"
              >
                Enter your lastname
              </FormLabel>
              <Input
                bgColor="#F4F4F4"
                borderRadius="10px"
                h="46px"
                gap="10px"
                type="text"
                name="lastname"
                fontSize="14px"
                p="12px"
                lineHeight="22px"
                fontWeight="400"
                placeholder="albdullahi"
                _placeholder={{
                  color: '#A8A8A8',
                  opacity: 0.4,
                  fontSize: '14px',
                }}
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </FormControl>
          </Flex>

          <Button
            bgColor="#55D4CC"
            opacity="0.5"
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
            Continue
          </Button>

          <Flex justifyContent="center">
            <Flex justifyContent="center" alignItems="center" gap="10px">
              <Text
                color="#383838"
                fontSize="14px"
                lineHeight="22px"
                fontWeight="500"
              >
                Don’t have an account?{' '}
                <Link to="/signup" style={{ color: '#0C4C84' }}>
                  Sign up here
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

export default SignWithEmail;
