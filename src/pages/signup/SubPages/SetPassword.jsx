import {
  Box,
  Flex,
  Text,
  FormControl,
  Input,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  Checkbox,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/Logo.png';

const SetPassword = () => {
  const [password, setPassword] = useState('');
  const [emailTest, setEmailTest] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {}, []);

  return (
    <Flex
      bgColor="#fff"
      color="#000000"
      h="628px"
      w="599px"
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
              Choose your password
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
            <Flex direction="column" gap="10px">
              <FormControl display="flex" flexDirection="column" gap="6px">
                <FormLabel
                  fontSize="14px"
                  color="#12141D"
                  lineHeight="22px"
                  fontWeight="500"
                >
                  Enter your password
                </FormLabel>
                <InputGroup h="46px" bgColor="#F4F4F4" borderRadius="10px">
                  <Input
                    borderRadius="10px"
                    h="46px"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    fontSize="14px"
                    p="12px"
                    lineHeight="22px"
                    fontWeight="400"
                    placeholder="****************"
                    _placeholder={{
                      color: '#A8A8A8',
                      opacity: 0.4,
                      fontSize: '14px',
                    }}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <InputRightElement
                    cursor="pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <FiEyeOff /> : <FiEye />}
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Flex gap="10px" alignItems="center">
                <Checkbox border="rgba(0, 0, 81, 0.3)"></Checkbox>
                <Text
                  fontSize="14px"
                  color="#000000"
                  lineHeight="22px"
                  fontWeight="400"
                >
                  I agree to Gift circle’s Terms and Privacy Policy.
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex justifyContent="right">
            
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
            Login
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

export default SetPassword;
